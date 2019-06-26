const httpStatus = require('http-status');
const shellJs = require('shelljs');
const fs = require('fs');
const gitHubApiService = require ('../../../services/github-api/github-api.service');

/**
 * angularGenerator
 * @public
 */
exports.angularGenerator = async (req, res, next) => {
  res.status(httpStatus.OK);
  return res.json({
    responseCode: 200,
    responseMessage: 'OK',
    response: {}
  });
};

exports.angularCliVersionCheck = async (req,res, next) => {
  var angularCliVersion = shellJs.exec('ng -v');
  var whoAmI = shellJs.exec('whoami');
  var listFiles = shellJs.ls('-A','src');
  var changeDirectory = shellJs.cd('src'); 
//  var newDirectory = shellJs.mkdir('AngularApp');
  var listFiles2 = shellJs.ls();
  var listFiles3 = shellJs.ls('-A','AngularApp/')
  var chdirtoAngular = shellJs.cd('AngularApp')
  var presentDirectoryName = shellJs.exec('echo -n "$(basename $PWD)"');
  //var presentDirectoryCheck = shellJs.exec('basename $PWD');
  
  var isAngularDirectoryName = new Boolean(false);
  if (presentDirectoryCheck == 'AngularApp') {
    isAngularDirectory = true;
  } else {
    isAngularDirectory = false;
  }
  return res.json({
    userName: whoAmI,
    DirectoryChange: changeDirectory,
    Files: listFiles,
    FilesInSrc: listFiles2,
    FilesInAngularApp: listFiles3,
    PresentDirectory: presentDirectoryCheck,
    AngularDirectoryBoolean: isAngularDirectory,
    responseMessage: 'OK'
  });
};

exports.generateAngularCliApp = async (req,res, next) => {
  const previousPath = shellJs.echo(shellJs.pwd());
  var requestBody = req.body;
  var projectDirectory = '~/phloxdb/projects';
  var appName = requestBody.appName;
  // Angular Cli new app options
  var skipInstallTag ='';
  var pwaTag ='';
  var inlineStyleTag = '';
  var inlineTemplateTag = '';
  var routingModuleTag = '';
  var skipTestTag = '';
  var appPrefixTag = '';
  var directoryNameTag = '';
  var stylesheetTag = '';
  // variables for true false based on api values
  var skipInstall = Boolean(false);
  var inlineStyle = Boolean(false);
  var inlineTemplate = Boolean(false);
  var pwa = Boolean(false);
  var routingModule = Boolean(false);
  var skipTest = Boolean(false);

  if ( typeof(appName) == 'undefined' || appName === null){
    return res.json({
      'Status': 'You must supply a name'
    });

  } else {
    // Set values from api
    skipInstall = requestBody.skipInstall;
    inlineStyle = requestBody.inlineStyle;
    inlineTemplate = requestBody.inlineTemplate;
    routingModule = requestBody.routingModule;
    skipTest = requestBody.skipTest;
    pwa = requestBody.pwa;
    var directoryName = requestBody.directoryName;
    var appPrefix = requestBody.appPrefix;
    var stylesheet = requestBody.stylesheet;

    var projectFolderExistOrNot = Boolean(false);
    var projectFolderExistOrNot = fs.existsSync(projectDirectory);
    if ( projectFolderExistOrNot) {
      shellJs.cd(projectDirectory);
    } else {
      shellJs.mkdir('~/phloxdb');
      shellJs.mkdir('~/phloxdb/projects');
      shellJs.cd('~/phloxdb/projects');
    }
    var presentDirectoryName = shellJs.exec('echo -n "$(basename $PWD)"').stdout;
    shellJs.echo('');
    var isProjectsDirectory = Boolean(false);
    if (presentDirectoryName == 'projects') {
      isProjectsDirectory = true;
      var angularInstallDirectory = shellJs.pwd();
      // Set tags based on true/false
      if ( inlineStyle ) {
        inlineStyleTag = '--inline-style';
      }
      if ( inlineTemplate) {
        inlineTemplateTag = '--inline-template';
      } 
      if ( routingModule ) {
        routingModuleTag = '--routing';
      } 
      if ( skipTest ) {
        skipTestTag = '-S'
      }
      if ( pwa ) {
        pwaTag = '--mobile';
      }
      if ( skipInstall ){
       skipInstallTag = '--skip-install';
      } 
      // Set app name and properties based on user input
      if ( typeof(appPrefix) !== 'undefined' || appPrefix  !== null ) {
        appPrefixTag =  `--prefix ${appPrefix}`;
      }
      if ( typeof(directoryName) !== 'undefined' || directoryName  !== null ) {
        directoryNameTag =  `--directory ${directoryName}`;
      }
      if ( typeof(stylesheet) !== 'undefined' || stylesheet  !== null ) {
        appPrefixTag =  `--style ${stylesheet}`;
      }
      
      var createAngularCliApp = shellJs
        .exec(`ng new ${appName} --skip-git ${skipTestTag} ${skipInstallTag} ${appPrefixTag} ${directoryNameTag} ${pwaTag} ${inlineStyleTag} ${inlineTemplateTag} ${routingModuleTag} 
        ${stylesheetTag}`,
        {silent:true})
        .stdout;

      var showOutputOfCli = createAngularCliApp.replace(RegExp('\n','g'),'<br>');
    } else {
      isProjectsDirectory = false;
    }
    // push to git repo
    var isPushToGithub = Boolean(false);
    isPushToGithub = requestBody.isPushToGithub;
    if ( isPushToGithub ){
      // github variables
      const gitUserName = requestBody.gitUserName;
      const gitPassword = requestBody.gitPassword;
      const userEmail = requestBody.userEmail;
      const nameOfUser = requestBody.nameOfUser;
      const repoDescription = requestBody.repoDescription;
      const repoPath = `${projectDirectory}/${appName}`;
      shellJs.cd(appName);
      shellJs.echo(shellJs.pwd());
      const pushToGithub = await gitHubApiService
          .pushCodeToGithubRepoWithUserNamePass(appName,repoDescription,gitUserName,gitPassword,repoPath,userEmail,nameOfUser);
      shellJs.cd(previousPath);
      return res.json({
        'SkipInstall': skipInstall,
        'Skip Test' : skipTest,
        'inlineStyle': inlineStyle,
        'inlineTemplate': inlineTemplate,
        'routingModule': routingModule,
        'angularProgress': showOutputOfCli,
        'responseMessage': `OK, ${appName} was created in Directory : ${angularInstallDirectory}`,
        'AppName': appName,
        'directory': angularInstallDirectory,
        'isPushToGitHub': isPushToGithub,
        'commitBranch' : pushToGithub.commitSummaryArray.branch,
        'commit' : pushToGithub.commitSummaryArray.commit,
        'commitSummary' : pushToGithub.commitSummaryArray.summary,
        'pushMessage' : pushToGithub.pushMessage
      });
    } else {
      // Do not push
      return res.json({
        'SkipInstall': skipInstall,
        'angularProgress': showOutputOfCli,
        'responseMessage': `OK, ${appName} was created in Directory : ${angularInstallDirectory}`,
        'AppName': appName,
        'directory': angularInstallDirectory,
        'isPushToGithub' : isPushToGithub
      }); 
    }
  }
};

exports.checkPost = async (req,res, next) => {
  var requestBody = req.body;
  var name = req.body.appName;
  var work = req.body.work;
  var another = req.body.another;
  var echoName = shellJs.echo('-n',`${name}`);
  var listFileInHome = shellJs.ls('~');
  var version = shellJs.exec('ng -v','false');
  var angularVersion = version;
  var angularVersion = version.replace(RegExp("\n","g"), "<br>");
  return res.json({
    first: name,
    second: work,
    third: another,
    fourth: requestBody,
    ApppNAme: echoName,
    'angularCliVersion': angularVersion,
    status : 'OK'
  });
};

exports.elasticsearch = async (req, res, next) => {
    var requestBody = req.body;
    var version = req.body.version;
    var node = req.body.node;
    var pwd = shellJs.pwd();
    shellJs.echo(`${pwd}`);
    var dockerFolderExistOrNot = fs.existsSync('Docker');
    if ( dockerFolderExistOrNot) {
      shellJs.cd('Docker');
    } else if ( !dockerFolderExistOrNot) {
      // shellJs.cd(`~/projects/phlox-planet/phloxdb/api`);
      shellJs.mkdir("Docker");
      shellJs.cd("Docker");
    }
    // shellJs.touch(`elasticsearch-node-${node}.yml`);
    var dockerOutput = shellJs.echo(`version: 2       
     services:
       elasticsearch:
        image: elasticsearch: ${version}
        ports:
            - 9200:9200
            - 9300:9300
    `).to(`elasticsearch-node-${node}.yml`);
    shellJs.cd("../");
    return res.json({
        version: version,
        node: node,
        dockerOutput: shellJs.cat(`Docker/elasticsearch-node-${node}.yml`),
        status: `OK, elasticsearch.yml file for elasticsearch version: ${version}`
        
    });  
};