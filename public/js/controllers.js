(function(angular) {
    const TOKEN_KEY = 'TOKEN_KEY';
    var controllers = angular.module('basicEnglishControllers', []);

    controllers.controller('basicEnglishController', ['$scope', 'userService', 'apiService', function ($scope, userService, apiService) {
        $scope.title='Basic English';
        $scope.isAuthorized = false;
        $scope.error = '';

        apiService.isAuthorized()
            .then(response => {
                $scope.isAuthorized = true;
            })
            .catch(err => {
                if(err.status === 401)
                    $scope.isAuthorized = false;
                console.log(err.data);
            });

        this.loginFormData = {
            username: '',
            password: '',
            errorMessage: '',
            login: function() {
                if(!this.username || !this.password){
                    this.errorMessage = "Username or password can't be empty."
                    return;
                }
                userService.login(this.username, this.password)
                    .then(response => {
                        window.localStorage.setItem(TOKEN_KEY, response.data.token);
                        $scope.isAuthorized = true;
                        this.errorMessage = '';
                        this.username = this.password = '';
                    }).catch(err =>{
                        this.errorMessage = err.data.message;
                    });
            }
        };

        var modes = {
            dictionary: 'dictionary',
            exercise: 'exercise',
            exerciseWithLearning: 'exerciseWithLearning',
            menu: 'menu'
        };
        var mode = modes.menu;
        var sizeOfWordSet = 12;
        var exerciseModes =  {
            checkWords: 1,
            checkFailedWords1: 2,
            checkFailedWords2: 3
        };

        this.mainPageData = {
            logout: function(){
                userService.logout()
                    .then(response => {
                        window.localStorage.removeItem(TOKEN_KEY);
                        $scope.isAuthorized = false;
                        $scope.error = '';
                    })
                    .catch(err => $scope.error = err.data);
            },
            setMenuMode: function(){
                mode = modes.menu;
            },
            setDictionaryMode: function(){
                mode = modes.dictionary;
                this.completeFullDictionary();
            },
            setExerciseMode: function(){
                if(this.isExerciseWithLearningMode) {
                    this.completeExerciseData();
                }
                mode = modes.exercise;
            },
            setExerciseWithLearningMode: function(){
                this.completeExerciseData();
                mode = modes.exerciseWithLearning;
            },
            isMenuMode: function(){
                return mode === modes.menu;
            },
            isDictionaryMode: function(){
                return mode === modes.dictionary;
            },
            isExerciseMode: function(){
                return mode === modes.exercise;
            },
            isExerciseWithLearningMode: function(){
                return mode === modes.exerciseWithLearning;
            },
            dictionaryData: null,
            completeFullDictionary: function() {
                apiService.getFullDictionary()
                    .then(response => {
                        if(!this.dictionaryData)
                            this.dictionaryData = response.data;
                    })
                    .catch(err => {
                        if(err.statusCode === 401)
                            $scope.isAuthorized = false;

                        $scope.error = err.data.message;
                    });
            },
            exerciseData: {
                exerciseMode: exerciseModes.checkWords,
                words: [],
                failedWords: [],
                currentWordNumber: 0,
                userInput: '',
                showAnswer: false,
                showSummary: false,
                checkWord: function() {
                    var word = this.words[this.currentWordNumber];
                    word.successful = word.engword === this.userInput.trim().toLowerCase();
                    this.showAnswer = true;
                    if(!word.successful && this.exerciseMode === exerciseModes.checkWords)
                        this.failedWords.push(word);
                },
                answerIsClearGoToNextWord: function(){
                    if(this.currentWordNumber < this.words.length - 1) {
                        this.currentWordNumber++;
                    } else if(this.exerciseMode < exerciseModes.checkFailedWords2) {
                        this.exerciseMode++;
                        this.words = this.failedWords;
                        this.currentWordNumber = 0;
                    } else {
                        this.showSummary = true;
                    }
                    this.showAnswer = false;
                    this.userInput = '';
                }
            },
            completeExerciseData: function(){
                apiService.getRandomWords(sizeOfWordSet)
                    .then(response => {
                        this.exerciseData.words = response.data;
                    })
                    .catch(err => {
                        if(err.statusCode === 401)
                            $scope.isAuthorized = false;

                        $scope.error = err.data.message;
                    });
            }
        };
    }]);

}(angular));