# 交叉编译流程说明

Debian 下，在 root 身份下，执行如下命令准备环境：

```shell
# apt update
# apt install automake libtool pkg-config cmake crossbuild-essential-armhf sudo git nano vim
```

回到普通用户，将仓库 clone 至本地，然后进入项目目录：

```shell
$ git clone http://172.17.138.214/ProjectFlight/dump1090-porting ~/dump1090-porting
$ cd ~/dump1090-porting
```

## 交叉编译 libusb

进入 `libusb` 项目根目录，直接执行命令：

```shell
$ cd ~/dump1090-porting/libusb
$ ./autogen.sh CC=arm-linux-gnueabihf-gcc CXX=arm-linux-gnueabihf-g++ --host=arm-linux-gnueabihf --prefix=/usr/arm-linux-gnueabihf --enable-udev=no
$ make -j`nproc`; sudo make install
```

## 交叉编译 librtlsdr

进入 `librtlsdr` 项目根目录

```shell
$ cd ~/dump1090-porting/librtlsdr
$ touch CrossCompile.cmake
```

创建 Cross Compile 配置，文件命名 `CrossCompile.cmake`，内容如下：

```
set(CMAKE_SYSTEM_NAME Linux)
set(CMAKE_C_COMPILER arm-linux-gnueabihf-gcc)
set(CMAKE_CXX_COMPILER arm-linux-gnueabihf-g++)
add_compile_options(-fPIC)
```

然后创建 build 目录，进入后用 `cmake` 工具进行生成 Makefile 后执行编译：

```shell
$ mkdir -p ~/dump1090-porting/librtlsdr/build
$ cd ~/dump1090-porting/librtlsdr/build
$ PKG_CONFIG_LIBDIR=/usr/arm-linux-gnueabihf/lib/pkgconfig cmake .. \
    -DDETACH_KERNEL_DRIVER=ON \
    -DCMAKE_TOOLCHAIN_FILE=../CrossCompile.cmake \
    -DCMAKE_INSTALL_PREFIX=/usr/arm-linux-gnueabihf
$ make -j`nproc`; sudo make install
```

## 交叉编译 dump1090

进入 `dump1090` 项目根目录，执行如下命令，生成静态 `dump1090` 可执行文件，上传到开发板

```shell
$ cd ~/dump1090-porting/dump1090
$ PKG_CONFIG_PATH=/usr/arm-linux-gnueabihf/lib/pkgconfig make ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- CC=arm-linux-gnueabihf-gcc
```
