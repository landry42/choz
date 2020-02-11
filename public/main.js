forkos = {
  boot:function(){
    this.bin.panel.run("terminal");
    write("Bienvenu(e) sur le terminal");
  },
  theme: {
    default:{
      bgPanel: '#404040',
      bgContent: '#202020',
      colorHeader: 'white',
      border: 'none'
    }
  },
  bin:{
    run:function(){
      write("Commande non reconnue, tapez 'help' pour plus d'infos","error");
    },
    help:{
      run:function(){
        write("Voici les commandes disponibles");
        for (elem in forkos.bin){
          write(" - "+elem);
        }
      },
      info:"'help' donne la liste des commandes disponibles",
    },
    echo:{
      run:function(text){
        write(text.join(" "))
      },
      info: "'echo' affiche ce qui est écrit après son appel",
    },
    info:{
      run:function(command){
        if(command in forkos.bin){
          if("info" in forkos.bin[command]){
            write(forkos.bin[command].info);
          } else {
            write("Ce programme n'a pas de manuel")
          }
        } else {
          write("Ce programme n'existe pas")
        }
      },
      info: "'info' donne des informations sur le fonctionnement des programmes",
    },
    terminal:{
      run:function(){
        forkos.bin.panel.run("terminal");
      },
      keyWord: function(text){
          res = text.split(" ");
          forkos.bin.terminal.enter(res);
      },
      enter: function(command){
        write("");
        path = forkos.bin;
        function searchPath(command){
          console.log(command);
          elem = command.shift();
          if("run" in path){
            command2 = command.slice(0);
            command2.unshift(elem);
            checkPath = path;
            checkCommand = command2;
          }
          console.log(typeof path[elem]);
          if(elem in path && typeof path[elem] == "object"){
            path = path[elem];
            searchPath(command);
          } else {
            checkPath.run(checkCommand);
          }
        }
        searchPath(command);
        document.getElementById("terminal-in").value = "";
      },
      resize: function () {
          var ta =  document.getElementById("terminal-out")
          ta.style.cssText = 'height:0px';
          ta.style.cssText = 'height:' + ta.scrollHeight + 'px';
          ta.scrollTop = ta.scrollHeight;
      },
      write: function(text, type = "log"){
          document.getElementById("terminal-out").value += text+"\n";
          this.resize();
      },
      info:"'terminal' permet d'entrer des commandes",
    },
    panel:{
      run: function(panel){
        if (typeof panel == "object"){
          panel = panel[0];
        }
        if (panel in this){
          panel = this[panel];
          panel.theme = forkos.theme.default;
          panel.iconfont = 'material-icons';
          panel.borderRadius = 5;
          jsPanel.create(panel);
        } else {
          write("voici les panels utilisables:");
          for(elem in this){
            if (elem != "run" && elem != "info"){
              write(" - "+elem);
            }
          }
        }

      },
      terminal:{
        headerTitle: 'TERMINAL',
        content:
        '<div id="terminal">'+
        '<textarea name="" id="terminal-out"  readonly></textarea>'+
        '<input id="terminal-in" type="text" onchange="forkos.bin.terminal.keyWord(this.value)">'+
        '</div>',
      },
      button:{
        headerTitle: 'BOUTON',
        content:
        '<dic class="center">'+
        '<input type="button" value="Voici un bouton" onclick="alert(\'Cliquable\')">'+
        '</div>',
      },
      info:"'panel' permet d'afficher un panel",
    }
  },
}

write = function(text){
  forkos.bin.terminal.write(text);
}


user = "test";

web = {
    push: function() {
      db.ref('user/' + user).update({
        coin: 666,
      });
    }
}

const preObject = document.getElementById('object');

const dbRefObject = db.ref();

dbRefObject.on('value', snap => console.log(snap.val()));