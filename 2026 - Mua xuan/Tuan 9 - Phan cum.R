rm(list=ls())
# Gọi gói 
library(datasets)
data("USArrests")
dat <- USArrests
d <- dist(dat)
hc <- hclust(d)
plot(hc)
# Cach ve bang ggdendro
library(ggdendro)
library(ape)
ggdendrogram(hc)
ggdendrogram(hc, rotate=TRUE) # xoay đồ thị
clus3 <- cutree(hc, 3)
# Xem các quan sát trong từng cụm
clus3
# Gán màu cho từng cụm và vẽ đồ thị
colors <- c("red", "blue", "green", "yellow")
plot(as.phylo(hc), tip.color=colors[clus3], label.offset=1, cex=0.7)
plot(as.phylo(hc), tip.color=colors[clus3], label.offset=1, cex=0.7, type="fan") # vẽ theo hình tròn
# Gan cum vào dữ liệu
library(dplyr)
clus3
b <- as.data.frame(clus3)
b
bind_cols(b, USArrests)
USArrests_cl <- bind_cols(b, USArrests)
# Xem dữ liệu
USArrests_cl
# Tính trung bình từng cụm
USArrests_cl %>% 
  group_by(clus3) %>% 
  summarise(mean(Murder), mean(Assault), mean(UrbanPop), mean(Rape))
# Phương pháp K-means
library(factoextra)
df=scale(USArrests)
# Vẽ biểu đồ Elbow
fviz_nbclust(df, kmeans, method="wss") + labs(subtitle = "Elbow method") #+ geom_vline(xintercept = 3, linetype = 2)
# Vẽ biểu đồ Silhouette
fviz_nbclust(df, kmeans, method="silhouette") + labs(subtitle = "Silhouette")
# Vẽ biểu đồ Gap_stat
fviz_nbclust(df, kmeans, nstart = 25, method="gap_stat", nboot=50) + labs(subtite="Gap statistic method")
# Chọn k =3
km <- kmeans(df, 3, nstart=25)
km
# Xem một số thông tin trong cụm
km$centers
km$withinss
km$tot.withinss
km$iter
# vẽ đồ thị
fviz_cluster(km, df)
# vẽ đồ thị
fviz_cluster(km, df, ellipse.type = "norm")
# Vẽ biểu đồ cây
hc=eclust(df, "hclust")
fviz_dend(hc, rect="TRUE")
library(cluster)
# Gán dữ liệu cụm vào cơ sở dữ liệu
a <- as.data.frame(km$cluster)
USArrests_cl <- bind_cols(a, USArrests)
USArrests_cl %>% 
  group_by(km$cluster) %>% 
  summarise(mean(Murder), mean(Assault), mean(UrbanPop), mean(Rape))
# Đánh giá chất lượng phân cụm
sl=silhouette(km$cluster, dist(df))
fviz_silhouette(sl)
# PHÂN CỤM PAM
library(fpc)
library(factoextra)
Arrest <- USArrests
Arrest <- na.omit(Arrest)
Arrest <- scale(Arrest)
pam3 <- pam(Arrest, 3, metric = "euclidean", stand = FALSE)
print(pam3)
# Gán cụm vào cơ sở dữ liệu
dd <- cbind(Arrest, cluster = pam$cluster)
head(dd, n = 10)
pam3$medoids
# Cluster numbers
head(pam3$clustering)
# Phân thành 4 cụm
pam4 <- pam(Arrest, 4,metric = "euclidean", stand = FALSE)
print(pam4)
pam4$medoids
head(pam4$clustering)
# PHÂN CỤM CLARA
USA_clara <- USArrests
clarax <- clara(USA_clara[1:4], 3)
## print components of clarax
print(clarax)
## plot clusters
plot(USA_clara, col = clarax$cluster)
# PHÂN CỤM K-MODE
rm(list=ls())
library(klaR)
library(scatterplot3d)
setwd("D:\\Huandv\\Bai giang\\Data Mining\\GIANG - Lecture - Seminar\\2026 - Mua xuan")
dat <- read.csv("babies.csv", sep=",")
dat1 <- dat[,-1]
rownames(dat1) <- dat[,1]
dat2 <- dat1[c(4, 6, 7, 10:12)]
str(dat2)
cl <- kmodes(dat2, 4, iter.max = 200, weighted = F, fast=T)
cl
cl$modes 
cl$size 
dat3 <- cbind(dat2, cl$cluster)
colnames(dat3)[7] <- "cluster"

