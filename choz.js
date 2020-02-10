choz = {};

choz.init = function(){
    choz.terminal.open();
}

choz.terminal = {
    open: function(){
        jsPanel.create({
            theme:this.theme,
            headerTitle: 'Terminal',
            content:
            '<div id="terminal">'+
            '<textarea name="" id="terminal-out"  readonly></textarea>'+
            '<input id="terminal-in" type="text" onchange="choz.terminal.keyWord(this.value)">'+
            '</div>',
        });
    },
    theme: {
        colorHeader: '#202020',
        colorContent: '#202020',
        BorderRadius: '0.5em',
    },
    keyWord: function(text){
        res = text.split(" ");
        if (choz.command.includes(res[0])){
            choz.terminal.enter(res);
        } else {
            this.write("Commande non reconnue","error");
        }
    },
    enter: function(command){
        if(command[0] === 'echo'){
            if(command.length > 1){
                choz.terminal.write(command[1]); 
            }
        }
    },
    resize: function () {
        var ta =  document.getElementById("terminal-out")
        ta.style.cssText = 'height:0px';
        ta.style.cssText = 'height:' + ta.scrollHeight + 'px';
        ta.scrollTop = ta.scrollHeight;
    },
    write: function(text, type = "log"){
        document.getElementById("terminal-out").value += text+"\n";
        document.getElementById("terminal-in").value = "";
        this.resize();
    }
}

choz.command = [
    'echo',
]
