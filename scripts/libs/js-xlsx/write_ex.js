function generate_sequence (){
 var sequence=[]
    for(var i=1;i<=33;i++){
        var baseChar =("A").charCodeAt(0);
        var alpha="";
        var number =i;

        do{
            number -= 1;
            alpha =String.fromCharCode(baseChar + (number %26)) +alpha;
            sequence[i]=alpha;
            number =(number /26) >> 0;
        }while(number>0);

        //console.log(alpha);
    }

};