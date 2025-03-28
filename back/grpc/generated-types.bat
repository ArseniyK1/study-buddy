protoc ^
  --plugin=protoc-gen-ts_proto=node_modules\.bin\protoc-gen-ts_proto.cmd ^
  --ts_proto_out=./src/proto/generated ^
  --ts_proto_opt=outputServices=grpc-js,nestJs=true,addGrpcMetadata=true,addNestjsRestParameter=true,returnObservable=false ^
  -I=./src/proto ^
  ./src/proto/user.proto