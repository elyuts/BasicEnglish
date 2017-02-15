app.controller('mainController', ['$scope', 'userService', 'localDataService', function ($scope, userService, localDataService) {
    localDataService.checkAuthorization();

    $scope.isAuthorized = function () {
        return localDataService.isAuthorized;
    };

    $scope.loginFormData = {
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
                    localDataService.isAuthorized = true;
                    this.errorMessage = '';
                    this.username = this.password = '';
                }).catch(err =>{
                    this.errorMessage = err.data.message;
                });
        }
    };

    $scope.logout = function(){
        userService.logout()
            .then(response => {
                window.localStorage.removeItem(TOKEN_KEY);
                localDataService.isAuthorized = false;
            })
            .catch(err => console.log(err.data));
    };
}])


.controller('dictionaryController', ['$scope', 'apiService', 'localDataService', function ($scope, apiService, localDataService) {

    $scope.makeSound = localDataService.makeSound;

    $scope.completeDictionary = function() {
        apiService.getFullDictionary()
            .then(response => {
                if(!$scope.words)
                    $scope.words = response.data;
            })
            .catch(err => {
                if(err.statusCode === 401)
                    localDataService.isAuthorized = false;
                console.log(err.data);
            });
    };

    $scope.completeDictionary();

}])

.controller('exerciseWithLearningController', ['$scope', 'apiService', 'localDataService', function ($scope, apiService, localDataService) {

    $scope.exerciseTutorialMode = true;

    $scope.makeSound = localDataService.makeSound;

    $scope.completeDictionary = function() {
        apiService.getRandomWords(sizeOfWordSet)
            .then(response => {
                $scope.words = response.data;
            })
            .catch(err => {
                if(err.statusCode === 401)
                    localDataService.isAuthorized = false;
                console.log(err.data);
            });
    };

    $scope.completeDictionary();
    localDataService.tutorialWords = $scope.words;

}])

.controller('exerciseController', ['$scope', 'apiService', 'localDataService', '$routeParams', function($scope, apiService, localDataService, $routeParams) {

    $scope.exerciseTutorialMode = JSON.parse($routeParams.tutorialMode);

    var exerciseModes =  {
        checkWords: 1,
        checkFailedWords1: 2,
        checkFailedWords2: 3
    };

    $scope.exerciseMode = exerciseModes.checkWords;
    $scope.words = [];
    $scope.failedWords = [];
    $scope.currentWordNumber = 0;
    $scope.userInput = '';
    $scope.showAnswer = false;
    $scope.showSummary = false;
    $scope.makeSound = localDataService.makeSound;

    $scope.checkWord = function() {
        var word = $scope.words[$scope.currentWordNumber];
        word.successful = word.engword === $scope.userInput.trim().toLowerCase();
        $scope.showAnswer = true;
        localDataService.makeSound(word, true)
        if(!word.successful && $scope.exerciseMode === exerciseModes.checkWords)
            $scope.failedWords.push(word);
    };

    $scope.answerIsClearGoToNextWord = function() {
        if($scope.currentWordNumber < $scope.words.length - 1) {
            $scope.currentWordNumber++;
        } else if($scope.exerciseMode < exerciseModes.checkFailedWords2) {
            $scope.exerciseMode++;
            $scope.words = $scope.failedWords;
            $scope.currentWordNumber = 0;
        } else {
            $scope.showSummary = true;
        }
        $scope.showAnswer = false;
        $scope.userInput = '';
    };

    if($scope.exerciseTutorialMode) {
        $scope.words = localDataService.tutorialWords;
    } else {
        $scope.completeDictionary = function() {
            apiService.getRandomWords(sizeOfWordSet)
                .then(response => {
                    $scope.words = response.data;
                })
                .catch(err => {
                    if(err.statusCode === 401)
                        localDataService.isAuthorized = false;
                    console.log(err.data);
                });
        };

        $scope.completeDictionary();
    }

}]);
