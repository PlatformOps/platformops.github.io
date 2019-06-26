import { Component, OnInit } from '@angular/core';
import { DirectoryService } from '../shared/directory.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {

  constructor(private directory: DirectoryService) { }

  output: any;
  fileText:any;
  directories = [];
  fullPwd: string;
  nextDir= [];
  currentFile: string;
  files = [];
  copyDirectory: string;
  pwds = [];

  copyDir(obj){
    this.copyDirectory = obj;
  }

  pasteDir(obj, action){
    if(action=='copy'){
      var isCopy = true;
    }else if(action == 'move'){
      var isCopy = false;
    }
    this.directory.pasteDirectory({source:this.copyDirectory, destination:this.fullPwd, isCopy:isCopy}).subscribe( data => {
      console.log(data);
      this.allDirectory();
    });
  }

  openNextDirectory(directory,type){
    this.openDirectory(directory,type,'');
    this.nextDir.pop();
    console.log(this.nextDir);
  }

  openDirectory(directory,type,currentDir){
    if(type=="folder"){
      if(currentDir!=null){
        this.nextDir.push(currentDir);
        console.log(this.nextDir);
      }
      this.directory.openDirectory({directoryName:directory, isFile:false}).subscribe(data => {
        this.allDirectory();
      });
    }else if(type=="file"){
      this.directory.openDirectory({directoryName:directory, isFile:true}).subscribe(data => {
        this.fileText = data;
        this.fileText = this.fileText.output;
      });
    }
  }

  openBread(index,value){
    this.openDirectory(this.output.pwd.split(value,1)+value,"folder",'');
  }

  openFile(file){
    this.currentFile = file;
    this.openDirectory(file,"file",'');
  }

  ngOnInit() {
    this.allDirectory();
  }

  allDirectory(){
    this.directory.fetchDirectory().subscribe(data => {
      this.output = data;
      this.directories = this.output.directory.trimRight("\n").split("\n");
      this.files = this.output.files.trimRight("\n").split("\n");
      this.fullPwd = this.output.pwd.trim("\n");
      this.pwds = this.output.pwd.split("/");
    });
  }

}
