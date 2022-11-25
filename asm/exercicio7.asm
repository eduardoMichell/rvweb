      .text   # segmento de codigo (programa)
       j   main

leaf_example:
       add t0, a0, a1   # $v0 = g + h
       add t1, a2, a3   # $v1 = i + j
       sub t0, t0, t1   # f = $t0 - $t1
       jr  ra             # retorna do procedimento
  
main:    
       addi a0, zero, 4   # inicializa 1 parametro (g)
       addi a1, zero, 3   # inicializa 2 parametro (h)
       addi a2, zero, 2   # inicializa 3 parametro (i)
       addi a3, zero, 1   # inicializa 4 parametro (j)

       jal leaf_example     # chama o procedimento
       nop                  # nao faz nada. $v0 tem o resultado do procedimento
