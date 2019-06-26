/**
 * Gitlab-api Service
 *
 */

const shellJs = require('shelljs');
const Gitlab = require('gitlab/dist/es5').default;

const gitlabApiService = {
    async pushCodeToGitlabRepoWithUserNamePassToken(repoName,repoDescription,gitUserName,gitPassword,gitToken,repoPath,userEmail,nameOfUser) {
        // Change repo to app folder
        shellJs.cd(repoPath);
    
        const simpleGitPromise = require('simple-git/promise')();

        // Create online repo if not exists
        const gitlabApi = new Gitlab({
            url:   'https://gitlab.com', // Defaults to http://gitlab.com
            token: gitToken	// Can be created in your profile.
        });

        const createRepo = await gitlabApi.Projects.create({name: `${repoName}`, description : `${repoDescription}`});

        // Url with username and password for automatic authentications
        const gitLabUrl = `https://${gitUserName}:${gitPassword}@gitlab.com/${gitUserName}/${repoName}.git`;

        // Initialize the repo
        simpleGitPromise.init();

        // Add remote repo url where the code will be pushed to 
        simpleGitPromise.addRemote('origin',gitLabUrl);

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
 };

module.exports = gitlabApiService;
