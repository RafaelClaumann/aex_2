mvn clean install -T 4C -DskipTests
docker image build -t aex-jar:latest .
