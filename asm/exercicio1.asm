      .text   # segmento de codigo (programa)
main:
       addi s1, zero, 4 
       addi s2, zero, 3 
       addi s3, zero, 2 
       addi s4, zero, 1 

       add t0, s1, s2     # t0 = s1 + s2
       add t1, s3, s4     # t1 = s3 + s4
       sub s0, t0, t1     # s0 = t0 - t1
   


