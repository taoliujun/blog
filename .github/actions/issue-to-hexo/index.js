const fs = require('fs');
const core = require('@actions/core');
const github = require('@actions/github');
const io = require('@actions/io');

/** @type ReturnType<typeof github.getOctokit> */
let octokit;
let owner = '';
let repo = '';

const generateIssue = async (issue_number) => {
    const issue = await octokit.rest.issues.get({
        owner,
        repo,
        issue_number,
    });

    const { title, body, created_at, labels, html_url } = issue.data;

    const bodyMatch = body.match(/<!--hexo\r?\n---([\r\n\s\S]+)---\r?\n-->/);
    if (!bodyMatch) {
        core.setFailed(`#${issue_number} has no hexo data`);
        return;
    }

    const urlMatch = bodyMatch[1].match(/url: ([\s\S]+?)\r?\n/);
    if (!urlMatch) {
        core.setFailed(`#${issue_number} has no url`);
        return;
    }

    const categories = labels
        ?.map((v) => {
            return `  - [${v.name}]`;
        })
        ?.join(`\n`);

    const hexoData = `---\ntitle: "${title}"\ndate: "${created_at}"\ncategories:\n${categories}\n${bodyMatch[1]}\n---\n`;

    const path = urlMatch[1];

    let content = '';

    content += `${hexoData}\n\n原文链接：[${html_url}](${html_url})\n\n${body}`;

    // list comments
    const comments = await octokit.rest.issues.listComments({
        owner,
        repo,
        issue_number,
    });

    const commentBodys = comments?.data
        ?.filter((v) => {
            return v.user.login === owner && v.body.includes('<!--hexo-->');
        })
        ?.map((v) => {
            return v.body;
        });
    content += `\n\n${commentBodys?.join(`\n`)}\n\n`;

    // console.log('==path', path);
    // console.log('==content', content);

    await io.mkdirP('./src/source/_posts');

    fs.writeFileSync(`./src/source/_posts/${path}.md`, content);

    // eslint-disable-next-line consistent-return
    return { path };
};

const main = async () => {
    const issue_number = core.getInput('issue_number');
    const token = core.getInput('token');
    owner = github.context.payload.repository.owner.login;
    repo = github.context.payload.repository.name;

    octokit = github.getOctokit(token);

    const issueNumbers = issue_number.split(',');

    const results = await Promise.all(
        issueNumbers.map((v) => {
            return generateIssue(v);
        }),
    );

    console.log(
        '==all paths',
        results?.map((v) => v.path),
    );
};

try {
    main();
} catch (err) {
    core.setFailed(err.message);
}
