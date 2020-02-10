choz = {};

choz.init = function(){
    choz.terminal.open();
}

choz.terminal = {
    open: function(){
        jsPanel.create({
            headerTitle: 'Terminal',
            content:
            '<div id="terminal">'+
            '<textarea name="" id="terminal-out" cols="30" rows="10" readonly></textarea>'+
            '<input id="terminal-in" type="text" onchange="choz.terminal.keyWord(this.value)">'+
            '</div>',
        });
    },
    keyWord: function(text){
        text = text.split(" ");
        res = [];
        text.forEach(element => {
            if (choz.command.includes(element)){
                res.push(element);
            }
        });
        choz.terminal.enter(res);
    },
    enter: function(command){
        if(command[0] === 'echo'){
            if(command.size > 1){
                choz.terminal.write(command[1]); 
            }
        }
    },
    write: function(text){
        document.getElementById("terminal-out").value += text+"\n";
        document.getElementById("terminal-in").value = "";
    }
}

choz.command = [
    'echo',
]