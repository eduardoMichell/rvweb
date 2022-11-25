     .data    # segmento de dados
Array_A: .word 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150

     text   # segmento de codigo (programa)
main:    

     addi x18, zero, 11    # Inicializa $s2 em 1
     la   s3, Array_A    # como o exercicio assume que o endereco-base de A[]
                         # estao em $s3, foi incluida esta instrucao
     lb   t0, 32(s3)     # $t0 = A[8]
     add  t0, s2, t0     # $t0 = $t0 + h
     sw   t0, 48(s3)     # A[12] = $t0
