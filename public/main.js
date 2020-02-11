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
    help:{
      run:function(){
        write("Voici les commandes disponibles");
        for (elem in forkos.bin){
          write(" - "+elem);
        }
      }
    },
    echo:{
      run:function(){
        write("argument manquant");
      },
      run:function(text){
        write(text)
      }
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
        if (command[0] in forkos.bin){
          forkos.bin[command[0]].run(command);
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
      run: function(panel){
        panel = this[panel]
        panel.theme = forkos.theme.default;
        panel.iconfont = 'material-icons';
        panel.borderRadius = 5;
        jsPanel.create(panel);
      },
      terminal:{
        headerTitle: 'TERMINAL',
        content:
        '<dic id="terminal">'+
        '<textarea name="" id="terminal-out"  readonly></textarea>'+
        '<input id="terminal-in" type="text" onchange="forkos.bin.terminal.keyWord(this.value)">'+
        '</div>',
      },
    }
  },
}

write = function(text){
  forkos.bin.terminal.write(text);
}