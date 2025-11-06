mvn clean install -T 4C -DskipTests -B
docker image build -t aex-jar:latest .

running_containers=$(docker container ls --format '{{.Names}}' | grep "^app-compose" | awk '{print $1}')
if [ -n "$running_containers" ]; then
  echo "Atualizando container < app-compose > após build da imagem!"
  docker-compose -f infra/compose.yaml up -d --no-deps --build app
fi
