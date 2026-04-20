rm(list=ls())
library(arules)
library(arulesSequences)
library(dplyr)

setwd("D:\\Huandv\\Bai giang\\Data Mining\\GIANG - Lecture - Seminar 2025\\2026 - Mua xuan")
# Đọc dữ liệu vào R dưới dạng 'transactions' cho chuỗi
patient_seqs <- read_baskets("medical_seq.txt", info = c("sequenceID", "eventID", "size"))


# Chạy thuật toán SPADE
# support = 0.1 nghĩa là chuỗi đó phải xuất hiện ở ít nhất 10% số bệnh nhân
s1 <- cspade(patient_seqs, 
             parameter = list(support = 0.1, maxsize = 1, maxlen = 4), 
             control = list(verbose = TRUE))

# Chuyển kết quả sang data frame để dễ quan sát
s1_df <- as(s1, "data.frame")

# Sắp xếp theo độ phổ biến (support)
s1_df <- s1_df[order(-s1_df$support), ]

# Hiển thị kết quả
print("Các chuỗi tuần tự y tế tìm thấy:")
head(s1_df, 50)

