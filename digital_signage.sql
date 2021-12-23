/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80020
 Source Host           : localhost:3306
 Source Schema         : digital_signage

 Target Server Type    : MySQL
 Target Server Version : 80020
 File Encoding         : 65001

 Date: 17/07/2021 18:54:08
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for canvas
-- ----------------------------
DROP TABLE IF EXISTS `canvas`;
CREATE TABLE `canvas`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `width` float NULL DEFAULT NULL,
  `height` float NULL DEFAULT NULL,
  `top` float NULL DEFAULT NULL,
  `left` float NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of canvas
-- ----------------------------
INSERT INTO `canvas` VALUES (1, 'FullHD FoodVideo', 1920, 1080, 0, 0);
INSERT INTO `canvas` VALUES (2, 'Full HD ImageFood', 1920, 1080, 0, 0);

-- ----------------------------
-- Table structure for caption
-- ----------------------------
DROP TABLE IF EXISTS `caption`;
CREATE TABLE `caption`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `time_start` time NULL DEFAULT NULL,
  `time_end` time NULL DEFAULT NULL,
  `background` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `screen_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of caption
-- ----------------------------
INSERT INTO `caption` VALUES (2, 'New Products Infomation', '00:00:00', '23:59:59', '#f0f0f0', 2);
INSERT INTO `caption` VALUES (3, 'Open Time', '12:00:00', '23:00:00', '#f1f1f1', 2);
INSERT INTO `caption` VALUES (4, 'Danh sách sản phẩm hồ tùng mậu', '00:00:00', '23:59:59', '#fffffff', 13);

-- ----------------------------
-- Table structure for caption_text
-- ----------------------------
DROP TABLE IF EXISTS `caption_text`;
CREATE TABLE `caption_text`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `caption_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of caption_text
-- ----------------------------
INSERT INTO `caption_text` VALUES (1, 'Món bánh mỳ Pháp bán từ ngày 20/11/2020', 2);
INSERT INTO `caption_text` VALUES (5, 'Món mỳ Ý giảm giá 50% từ ngày 22/11/2020', 2);
INSERT INTO `caption_text` VALUES (6, 'Thời gian mở cửa: 8 sáng tới 11h tối', 3);
INSERT INTO `caption_text` VALUES (7, 'Trà sữa ô long', 4);
INSERT INTO `caption_text` VALUES (8, 'Trà sữa ba anh em', 4);
INSERT INTO `caption_text` VALUES (9, 'Trà sữa trân châu hoàng gia', 4);

-- ----------------------------
-- Table structure for frame
-- ----------------------------
DROP TABLE IF EXISTS `frame`;
CREATE TABLE `frame`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `frame_type_id` int NULL DEFAULT NULL,
  `media_id` int NULL DEFAULT NULL,
  `time_show` int NULL DEFAULT NULL,
  `panel_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of frame
-- ----------------------------
INSERT INTO `frame` VALUES (8, ' FullHD FoodVideo_1_1', 2, 8, 5000, 1);
INSERT INTO `frame` VALUES (9, ' FullHD FoodVideo_2_1', 2, 9, 5000, 2);
INSERT INTO `frame` VALUES (10, ' FullHD FoodVideo_3_1', 2, 10, 5000, 4);
INSERT INTO `frame` VALUES (11, ' FullHD FoodVideo_4_1', 2, 11, 5000, 5);
INSERT INTO `frame` VALUES (12, 'Full_HD_ImageFood_1_1', 1, 12, 2000, 6);
INSERT INTO `frame` VALUES (13, 'Full_HD_ImageFood_1_2', 1, 13, 5000, 6);
INSERT INTO `frame` VALUES (14, 'Full_HD_ImageFood_1_3', 1, 14, 5000, 6);
INSERT INTO `frame` VALUES (15, 'Full_HD_ImageFood_2_1', 2, 8, 5000, 7);
INSERT INTO `frame` VALUES (16, 'Full_HD_ImageFood_3_1', 2, 9, 5000, 8);

-- ----------------------------
-- Table structure for frame_type
-- ----------------------------
DROP TABLE IF EXISTS `frame_type`;
CREATE TABLE `frame_type`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of frame_type
-- ----------------------------
INSERT INTO `frame_type` VALUES (1, 'image');
INSERT INTO `frame_type` VALUES (2, 'video');

-- ----------------------------
-- Table structure for media
-- ----------------------------
DROP TABLE IF EXISTS `media`;
CREATE TABLE `media`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `file_extension` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `file_path` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of media
-- ----------------------------
INSERT INTO `media` VALUES (8, 'món nướng.mp4', 'mp4', '/uploads/1605024887979-món nướng.mp4');
INSERT INTO `media` VALUES (9, 'cà chua.mp4', 'mp4', '/uploads/1605024888090-cà chua.mp4');
INSERT INTO `media` VALUES (10, 'món ăn lẩu.mp4', 'mp4', '/uploads/1605024888144-món ăn lẩu.mp4');
INSERT INTO `media` VALUES (11, 'món hấp.mp4', 'mp4', '/uploads/1605025071068-món hấp.mp4');
INSERT INTO `media` VALUES (12, 'món trộn.jpg', 'jpg', '/uploads/1605026559420-món trộn.jpg');
INSERT INTO `media` VALUES (13, 'pancake.jpg', 'jpg', '/uploads/1605026559430-pancake.jpg');
INSERT INTO `media` VALUES (14, 'thịt xiên.jpg', 'jpg', '/uploads/1605026559433-thịt xiên.jpg');

-- ----------------------------
-- Table structure for panel
-- ----------------------------
DROP TABLE IF EXISTS `panel`;
CREATE TABLE `panel`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `width` float NULL DEFAULT NULL,
  `height` float NULL DEFAULT NULL,
  `top` float NULL DEFAULT NULL,
  `left` float NULL DEFAULT NULL,
  `canvas_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Một vùng không gian hiển thị trong Canvas chứa 1 or nhiều Frame' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of panel
-- ----------------------------
INSERT INTO `panel` VALUES (1, ' FullHD FoodVideo_1', 960, 540, 0, 0, 1);
INSERT INTO `panel` VALUES (2, ' FullHD FoodVideo_2', 960, 540, 0, 960, 1);
INSERT INTO `panel` VALUES (4, ' FullHD FoodVideo_3', 960, 540, 540, 0, 1);
INSERT INTO `panel` VALUES (5, ' FullHD FoodVideo_4', 960, 540, 540, 960, 1);
INSERT INTO `panel` VALUES (6, 'Full_HD_ImageFood_1', 960, 1080, 0, 0, 2);
INSERT INTO `panel` VALUES (7, 'Full_HD_ImageFood_2', 960, 540, 0, 960, 2);
INSERT INTO `panel` VALUES (8, 'Full_HD_ImageFood_3', 960, 540, 540, 960, 2);

-- ----------------------------
-- Table structure for screen
-- ----------------------------
DROP TABLE IF EXISTS `screen`;
CREATE TABLE `screen`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `canvas_id` int NULL DEFAULT NULL,
  `caption_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `unique_name_screen`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of screen
-- ----------------------------
INSERT INTO `screen` VALUES (2, 'caugiay1', '123', 2, NULL);
INSERT INTO `screen` VALUES (13, 'hotungmau', '123', 1, NULL);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_type_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 AVG_ROW_LENGTH = 8192 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'management', '1', 1);
INSERT INTO `user` VALUES (2, 'client', '1', 2);

-- ----------------------------
-- Table structure for user_type
-- ----------------------------
DROP TABLE IF EXISTS `user_type`;
CREATE TABLE `user_type`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 AVG_ROW_LENGTH = 8192 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_type
-- ----------------------------
INSERT INTO `user_type` VALUES (1, 'management');
INSERT INTO `user_type` VALUES (2, 'client');

SET FOREIGN_KEY_CHECKS = 1;
