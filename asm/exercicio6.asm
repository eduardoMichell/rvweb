      .text   # segmento de codigo (programa)
main:    
       addi s0, zero, 0     # i=0
Loop:  slti t0, s0, 10      # se i<10 entao $t0=1 senao $t0=0
       beq  t0, zero, Exit  # se $t0=0 entao goto Exit
       addi s1, s1, 1       # j++
       addi s0, s0, 1       # i++ (do laco for)
       j    Loop              # goto Loop
Exit:  nop
