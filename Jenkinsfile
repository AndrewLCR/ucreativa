pipeline {
    agent any
    stages {
        stage("Build") {
            steps {
                echo 'php --version'
                echo 'composer install'
                echo 'composer --version'
                echo 'cp .env.example .env'
                echo 'echo DB_HOST=${DB_HOST} >> .env'
                echo 'echo DB_USERNAME=${DB_USERNAME} >> .env'
                echo 'echo DB_DATABASE=${DB_DATABASE} >> .env'
                echo 'echo DB_PASSWORD=${DB_PASSWORD} >> .env'
                echo 'php artisan key:generate'
                echo 'cp .env .env.testing'
                echo 'php artisan migrate'
            }
        }
        stage("Unit test") {
            steps {
                echo 'php artisan test'
            }
        }
        stage("Code coverage") {
            steps {
                echo "vendor/bin/phpunit --coverage-html 'reports/coverage'"
            }
        }
        stage("Static code analysis larastan") {
            steps {
                echo "vendor/bin/phpstan analyse --memory-limit=2G"
            }
        }
        stage("Static code analysis phpcs") {
            steps {
                echo "vendor/bin/phpcs"
            }
        }
        stage("Docker build") {
            steps {
                echo "docker build -t danielgara/laravel8cd ."
            }
        }
        stage("Docker push") {
            environment {
                DOCKER_USERNAME = credentials("docker-user")
                DOCKER_PASSWORD = credentials("docker-password")
            }
            steps {
                echo "docker login --username ${DOCKER_USERNAME} --password ${DOCKER_PASSWORD}"
                echo "docker push danielgara/laravel8cd"
            }
        }
        stage("Deploy to staging") {
            steps {
                echo "docker run -d --rm -p 80:80 --name laravel8cd danielgara/laravel8cd"
            }
        }
        stage("Acceptance test curl") {
            steps {
                sleep 20
                echo "chmod +x acceptance_test.sh && ./acceptance_test.sh"
            }
        }
        stage("Acceptance test codeception") {
            steps {
                echo "vendor/bin/codecept run"
            }
            post {
                always {
                    echo "docker stop laravel8cd"
                }
            }
        }
    }
}