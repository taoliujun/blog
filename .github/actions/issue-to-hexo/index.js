const fs = require('fs');
const core = require('@actions/core');
const github = require('@actions/github');
const io = require('@actions/io');

const main = async () => {
    const issue_number = core.getInput('issue_number');
    const token = core.getInput('token');
    const owner = github.context.payload.repository.owner.login;
    const repo = github.context.payload.repository.name;

    const octokit = github.getOctokit(token);

    const issue = await octokit.rest.issues.get({
        owner,
        repo,
        issue_number,
    });

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

    const content = `
        ${hexoData}
        \n\n
        原文链接：[${html_url}](${html_url})
        \n\n
        ${body}
    `;

    console.log('==path', path);
    console.log('==content', content);

    await io.mkdirP('./src/source/_posts');

    fs.writeFileSync(`./src/source/_posts/${path}.md`, content);
};

try {
    main();
} catch (err) {
    core.setFailed(err.message);
}
