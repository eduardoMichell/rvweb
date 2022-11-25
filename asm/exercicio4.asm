      .text   # segmento de codigo (programa)
main: 
      addi   s1, zero, 10   # inicializa $s1 em 10
      addi   s2, zero, 20   # inicializa $s2 em 20
      addi   s3, zero, 1    # inicializa $s3 em 1
      addi   s4, zero, 2    # inicializa $s4 em 2  
      sw t1 (t2)
      bne 	s3, s4, Else   # se i!=j goto Else
      add 	s0, s1, s2    # f = g + h
      j   	Exit             # goto Exit
Else: sub 	s0, s1, s2    # f = g - h
Exit: nop   
