.PHONY: build clean run

DIST_DIR=../dist
BUILD_DIR=./build

build: clean
	@GENERATE_SOURCEMAP=false npm run build
	@rm -rf $(DIST_DIR)
	@mv $(BUILD_DIR) $(DIST_DIR)

run:
	@BROWSER=none npm run start

clean:
	@rm -rf $(BUILD_DIR) $(DIST_DIR)
	@mkdir -p $(DIST_DIR)
