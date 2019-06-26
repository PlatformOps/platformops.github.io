const httpStatus = require('http-status');
const shelljs = require('shelljs');

const jhipsterProjectsDirectory = '~/phloxdb/projects/jhipster';
const jhipsterGeneratorService = require('../../../services/jhipster-generator/jhipster-generator.service');
const gitlabService = require('../../../services/gitlab-api/gitlab-api.service');
/**
 * jhipsterGenerator
 * @public
 */
exports.jhipsterGenerator = async (req, res, next) => {
  console.log('Generate Jhipster API Method was called')
  res.status(httpStatus.OK);
  let requestBody = req.body;
  let jhipsterApplicationType;
  let jhipsterPackageFolder;
  let jhipsterBaseName;
  let isPushToGitlab = Boolean(false);
  let myJhipsterObject = {
    'jhipsterConfiguration' : {},
    'gitlabObject': {}
  };
  let projectDirectoryExists;

  myJhipsterObject = requestBody;

  console.log(myJhipsterObject);
  
  jhipsterJsonOptions = myJhipsterObject.jhipsterConfiguration;

  // Check if project directory exist else create directory
  projectDirectoryExists = shelljs.test('-d',jhipsterProjectsDirectory);
  if (!projectDirectoryExists) {
    shelljs.mkdir('~/phloxdb');
    shelljs.mkdir('~/phloxdb/projects');
    shelljs.mkdir('~/phloxdb/projects/jhipster');
  } 

  // change current work directory to projects directory
  shelljs.cd(jhipsterProjectsDirectory);

  // create directory with application base name
  jhipsterBaseName = jhipsterJsonOptions.baseName;
  shelljs.mkdir(jhipsterBaseName);

  // change to app directory
  shelljs.cd(jhipsterBaseName);

  // Check Application type and call method to create yo-rc.json file creation
  console.log('Yo-Rc.json file creation method called');
  jhipsterApplicationType = jhipsterJsonOptions.applicationType;
  if ( jhipsterApplicationType === 'monolith'){
    jhipsterGeneratorService.createYoRcforMonolith(jhipsterJsonOptions, jhipsterBaseName);
  } else if ( jhipsterApplicationType === 'microservice'){
    jhipsterGeneratorService.createYoRcforMicroservice(jhipsterJsonOptions, jhipsterBaseName);
  } else if ( jhipsterApplicationType === 'gateway'){
    jhipsterGeneratorService.createYoRcforGateway(jhipsterJsonOptions,jhipsterBaseName);
  } else if ( jhipsterApplicationType === 'uaa'){
    jhipsterGeneratorService.createYoRcforUAA(jhipsterJsonOptions,jhipsterBaseName);
  }

  // Run Jhipster command to generate the app
  const yoJhipster = await shelljs.exec('jhipster --skip-install --skip-git --skip-cache');

  const jhipsterCommand = yoJhipster.stdout.replace(RegExp('\n','g'),'<br>');
  const jhipsterOutput = yoJhipster.stderr.replace(RegExp('\n','g'),'<br>');

  isPushToGitlab = myJhipsterObject.gitlabObject.isPushToGitlab;
  if ( isPushToGitlab ) {
    // Push to Gitlab
    const gitlabValues = myJhipsterObject.gitlabObject;
    const gitUserName = gitlabValues.gitUserName;
    const gitPassword = gitlabValues.gitPassword;
    const userEmail = gitlabValues.userEmail;
    const nameOfUser = gitlabValues.nameOfUser;
    const repoDescription = gitlabValues.repoDescription;
    const repoPath = `${jhipsterProjectsDirectory}/${jhipsterBaseName}`;
    const gitToken = gitlabValues.gitToken;
    shelljs.echo(shelljs.pwd());
    const pushToGitLab = await gitlabService
        .pushCodeToGitlabRepoWithUserNamePassToken(jhipsterBaseName, repoDescription, gitUserName, gitPassword, gitToken, repoPath, userEmail, nameOfUser);

    return res.json({
      responseCode: 200,
      'jhipsterCommand': jhipsterCommand,
      'jhipsterOutput': jhipsterOutput,
      'responseMessage': `${jhipsterBaseName} was generated in directory ${jhipsterProjectsDirectory}${jhipsterBaseName}`,
      'isPushToGitlab': isPushToGitlab,
      'commitBranch' : pushToGitLab.commitSummaryArray.branch,
      'commit' : pushToGitLab.commitSummaryArray.commit,
      'commitSummary' : pushToGitLab.commitSummaryArray.summary,
      'pushMessage' : pushToGitLab.pushMessage
    });
  } else {
    // Do not Push
    return res.json({
      responseCode: 200,
      'jhipsterCommand': jhipsterCommand,
      'jhipsterOutput': jhipsterOutput,
      'responseMessage': `${jhipsterBaseName} was generated in directory ${jhipsterProjectsDirectory}${jhipsterBaseName}`,
      'isPushToGitlab' : isPushToGitlab
    });
}
};
