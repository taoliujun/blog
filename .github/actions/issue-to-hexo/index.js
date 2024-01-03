const fs = require('fs');
const core = require('@actions/core');
const github = require('@actions/github');
const io = require('@actions/io');

const main = async () => {
    const issue_number = core.getInput('issue_number');
    const token = `\${{github.token}}`;
    const owner = `\${{ github.event.repository.owner.login }}`;
    const repo = `\${{ github.event.repository.name }}`;

    console.log('==token', token);

    return;

    const octokit = github.getOctokit(token);

    const issue = await octokit.rest.issues.get({
        owner,
        repo,
        issue_number,
    });

    console.log('==issue', JSON.stringify(issue.data));
    const { title, body, created_at, labels, html_url } = issue.data;

    const bodyMatch = body.match(/<!--hexo\r?\n---([\r\n\s\S]+)---\r?\n-->/);

    if (!bodyMatch) {
        core.setFailed('no hexo data');
        return;
    }

    const urlMatch = bodyMatch[1].match(/url: ([\s\S]+?)\r?\n/);

    if (!urlMatch) {
        core.setFailed('no url');
        return;
    }

    const categories = labels
        ?.map((v) => {
            return `  - [${v.name}]`;
        })
        ?.join(`\n`);

    const hexoData = `
      ---
      title: "${title}"
      date: "${created_at}"
      categories:
      ${categories}
      ${bodyMatch[1]}
      ---
    `;

    const path = urlMatch[1];

    console.info('==path', path);
    console.info('==hexoData', hexoData);

    await io.mkdirP('./src/source/_posts');

    const content = `
        ${hexoData}
        \n\n
        原文链接：[${html_url}](${html_url})
        \n\n
        ${body}
    `;

    fs.writeFileSync(`./src/source/_posts/${path}.md`, content);
};

try {
    main();
} catch (err) {
    core.setFailed(err.message);
}
