mindfork = {

  init:function(){
    this.open(this.panel["terminal"]);
    Print("Bienvenu(e) sur le terminal");
  },

  open:function(panel){
    panel.theme = this.theme;
    panel.iconfont = 'material-icons';
    panel.borderRadius = 5;
    jsPanel.create(panel);
  },

  theme: {
    bgPanel: '#404040',
    bgContent: '#202020',
    colorHeader: 'white',
    border: 'none'
  },

  terminal:{
    keyWord: function(text){
        res = text.split(" ");
        mindfork.terminal.enter(res);
    },
    enter: function(command){
      Print("");
      this.commandList = {
        echo:function(){
          Print(command.slice(1,command.length).join(" "));
        },
        help:function(){
          Print("Voici les commandes disponibles:");
          for(elem in this){
            Print("- "+elem);
          }
        },
        panel:function(){
          if(command.length > 1){
            mindfork.open(mindfork.panel[command[1]]);
          }else{
            Print("Il manque le nom du Panel, il doit appartenir à cette liste");
            for(elem in mindfork.panel){
              Print("- "+elem);
            }
          }
        },
      }
      if (command[0] in mindfork.panel){
        mindfork.open(mindfork.panel[command[0]]);
      } else if (command[0] in this.commandList){
        this.commandList[command[0]]();
      } else {
        this.write("Commande non reconnue, tapez 'help' pour plus d'infos","error");
      }
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
    }
  },
  panel:{
    terminal:{
      headerTitle: 'Terminal',
      content:
      '<dic id="terminal">'+
      '<textarea name="" id="terminal-out"  readonly></textarea>'+
      '<input id="terminal-in" type="text" onchange="mindfork.terminal.keyWord(this.value)">'+
      '</div>',
    },
    button:{
      headerTitle: 'Button',
      content:
      '<div class="center">'+
      '<button onclick = "alert(\'Et il fonctionne!\')">Et voici un bouton</button>'+
      '</div>',
    },
    twobutton:{
      headerTitle: '2 Button',
      content:
      '<div class="center">'+
      '<button onclick = "alert(\'Et il fonctionne!\')">Et voici un bouton</button>'+
      '<button onclick = "alert(\'Et il fonctionne!\')">Et voici un bouton</button>'+
      '</div>',
    }
  }
}

Print = function(text){
  mindfork.terminal.write(text);
}
