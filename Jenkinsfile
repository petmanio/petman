#!groovy​

//properties([pipelineTriggers([[$class: 'GitHubPushTrigger'], pollSCM('H/15 * * * *')])])

dockerTag = "snapshot"
if(BRANCH_NAME == "master") {
    dockerTag = "latest"
}

pipeline {
    agent any

    environment {
        DOCKER_HOST='tcp://172.17.0.1:4243'
    }

    stages {
        stage('Prepare') {
            steps {
                sh "rm -rf dist"
            }
        }

        stage('Build development docker image') {
            when {
                expression { return BRANCH_NAME == "develop" }
            }
            steps {
                sh "docker -H ${DOCKER_HOST} build -t docker-registry.dev.navads.eu/petman:${dockerTag} ."
            }
        }

        stage('Push development image to docker') {
            when {
                expression { return BRANCH_NAME == "develop" }
            }
            steps {
                sh "docker -H ${DOCKER_HOST} push docker-registry.dev.navads.eu/petman:${dockerTag}"
            }
        }

        stage('Build production docker image') {
            when {
                expression { return BRANCH_NAME == "master" }
            }
            steps {
                sh "docker -H ${DOCKER_HOST} build -t docker-registry.dev.navads.eu/petman:${dockerTag} ."
                sh "docker -H ${DOCKER_HOST} build -t docker-registry.dev.navads.eu/petman:`./get_version.sh` ."
            }
        }

        stage('Push production image to docker') {
            when {
                expression { return BRANCH_NAME == "master" }
            }
            steps {
                sh "docker -H ${DOCKER_HOST} push docker-registry.dev.navads.eu/petman:${dockerTag}"
                sh "docker -H ${DOCKER_HOST} push docker-registry.dev.navads.eu/petman:`./get_version.sh`"
            }
        }
    }
}

