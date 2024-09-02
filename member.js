function skillsMember() {
    return {
        restrict: 'E',
        templateUrl: 'views/skills.html',
        controller: 'SkillsController',
        controllerAs: 'vm',
        bindToController: true,
        scope: {
            member: '='
        }
    };
}