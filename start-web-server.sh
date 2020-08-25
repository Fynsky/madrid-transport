# Save current directory absolute pah to a avariable.
# It will be used since Docker doesn't allow to use relative paths in volumes
CURR_DIR_ABS_PATH="$(pwd)"

docker run --name react-bus-nginx -v $CURR_DIR_ABS_PATH/../react-bus-static-files:/usr/share/nginx/html:ro -d -p 80:80 -v $CURR_DIR_ABS_PATH/nginx.conf:/etc/nginx/nginx.conf:ro nginx