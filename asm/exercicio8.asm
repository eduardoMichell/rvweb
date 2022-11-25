      .text   # segmento de codigo (programa)
	 j   main	

leaf_example:
       addi a5, a5 12	
       sub sp, sp, a5    # ajusta a pilha para 3 valores
       sw  t1, 8(sp)     # salva o conteudo de $t1
       sw  t0, 4(sp)     # salva o conteudo de $t0
       sw  s0, 0(sp)     # salva o conteudo de $s0

       add t0, a0, a1   # $t0 = g + h
       add t1, a2, a3   # $t1 = i + j
       sub s0, t0, t1   # f = $t0 - $t1
       add t3, s0, zero # return f

       lw  s0, 0(sp)     # restaura $s0 da pilha
       lw  t0, 4(sp)     # restaura $t0 da pilha
       lw  t1, 8(sp)     # restaura $t1 da pilha
       addi sp, sp, 12    # ajusta a pilha
       jr  ra             # retorna do procedimento

main:    
       addi t1, zero, 1  # inicia reg. com valor diferente de 0
       addi t0, zero, 2  # inicia reg. com valor diferente de 0
       addi s0, zero, 3  # inicia reg. com valor diferente de 0

       addi a0, zero, 4  # inicializa 1 parametro (g)
       addi a1, zero, 3  # inicializa 2 parametro (h)
       addi a2, zero, 2  # inicializa 3 parametro (i)
       addi a3, zero, 1  # inicializa 4 parametro (j)

       jal leaf_example    # chama o procedimento

       nop                 # nao faz nada. $v0 tem o resultado do procedimento
