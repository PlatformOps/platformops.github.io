export class GitFieldsModel {
    constructor (
        public isPushToGitlab: boolean,
        public gitProvider: string,
        public gitUserName: string,
        public gitPassword: string,
        public gitToken: string,
        public userEmail: string,
        public nameOfUser: string,
        public repoDescription: string,
    ) {
        this.isPushToGitlab = false;
    }
}
