 
.data
selecionaNumbero:      .string  "Insira um numero: "
mostraNumero: 	     .string  "O numero escolhido foi: "

.text

 start: 
                
    la    a0, selecionaNumbero # carrega o endere�o da stringselecionaNumbero
    addi  a7, x0, 4            # carrega o servi�o numnero 4 (printString) 
    ecall                

    addi  a7, x0, 5            # carrega o servi�o numnero 5 (readInt)
    ecall  
        
    add t1, x0, a0		 # salva o numero lido no registrador t1

    la    a0, mostraNumero     # carrega o endere�o da string mostraNumero
    addi  a7, x0, 4      	 # carrega o servi�o numnero 4 (printString) 
    ecall                

    add  a0, x0, t1	       # coloca o valor lido no a0 (parametro do printInt)
    addi  a7, x0, 1       	 # carrega o servi�o numero 1 (printInt)
    ecall                

    addi  a7, x0, 93     	 # carrega o servi�o 93 (exit)
    ecall 
