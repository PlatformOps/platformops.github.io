/**
 * Github-api Service
 *
 */

const octokit = require('@octokit/rest')();
const shellJs = require('shelljs');


const githubApiService = {
    async pushCodeToGithubRepoWithUserNamePass(repoName,repoDescription,gitUserName,gitPassword,repoPath,userEmail,nameOfUser) {
        // Change repo to app folder
        shellJs.cd(repoPath);

        const simpleGitPromise = require('simple-git/promise')();
        // Create online repo if not exists
        octokit.authenticate({
            type: 'basic',
            username: gitUserName,
            password: gitPassword
        });
        const createRepo = await octokit.repos.create({name: `${repoName}`, description: `${repoDescription}`});

        // Url with username and password for automatic authentications
        const gitHubUrl = `https://${gitUserName}:${gitPassword}@github.com/${gitUserName}/${repoName}`;

        // Initialize the repo
        simpleGitPromise.init();

        // Add remote repo url where the code will be pushed to 
        simpleGitPromise.addRemote('origin',gitHubUrl);

        // Setting Local git configuration for user
        simpleGitPromise.addConfig('user.email',userEmail);
        simpleGitPromise.addConfig('user.name',nameOfUser);
        
        // Add files to be staged for commit
        simpleGitPromise.add('./*');

        // Initial Commit
        var commitSummaryArray = await simpleGitPromise.commit('Intial Commit');
        
        // Push to remote origin branch to default as master
        var pushMessage = await simpleGitPromise.push('origin','master')
            .then(
                success => { return 'success'; },
                rejected => { return 'rejected';}
            ); 

        let result = {
            'commitSummaryArray': commitSummaryArray,
            'pushMessage': pushMessage
        };
        return Promise.resolve(result);
    }
}

module.exports = githubApiService;
