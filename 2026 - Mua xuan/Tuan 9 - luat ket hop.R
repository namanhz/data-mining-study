rm(list=ls())
library(arules)
setwd("D:\\Huandv\\Bai giang\\Data Mining\\GIANG - Lecture - Seminar 2025\\2026 - Mua xuan")
trans <- read.transactions("benh_nhan_data.csv", 
                           format = "basket", 
                           sep = ",", 
                           rm.duplicates = FALSE)
summary(trans)
rules <- apriori(trans, control = list(verbose=F),
                 parameter = list(minlen=1,support=0.1,conf=0.3))
# Sắp xếp theo độ tin cậy (Confidence)
inspect(sort(rules, by = "lift"))
#Để loại bỏ quy luật thừa ta làm như sau:
redundant=is.redundant(rules,measure="confidence")
rule1=rules[!redundant]
inspect(rule1)
# Chỉ xem các luật kết hợp các triệu chứng khi bị COVID-19
rules2 <- apriori(trans, control = list(verbose=F),
              parameter = list(minlen=1,support=0.1,conf=0.3),
              appearance = list(rhs=c("COVID-19"),
                                default="lhs"))
inspect(sort(rules2, by = "lift"))

# THUẬT TOÁN FP-Growth
library(rCBA)
library(rJava)
rules3 <- rCBA::fpgrowth(trans, support = as.numeric(0.1), confidence = as.numeric(0.3), maxLength = as.integer(5),
                         consequent = NULL, verbose = TRUE, parallel = FALSE)


# THUẬT TOÁN IT-Tree
library(arules)
rules <- eclat(trans, parameter = list(supp = 0.1, maxlen = 5)) 
inspect(sort(rules, by = "support"))
                                       
