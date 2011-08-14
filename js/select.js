(function () {
    var workspace = document.getElementById('workspace'),
        paper = Raphael('workspace', 800, 600);

    function getPosition(e) {
        return {
            x: e.clientX - ((e.clientX - e.offsetX) || e.target.parentNode.offsetLeft),
            y: e.clientY - ((e.clientY - e.offsetY) || e.target.parentNode.offsetTop)
        };
    }

    function onMouseMove(startPos, selection) {
        return function (e) {
            var currentPos = getPosition(e),
                width = currentPos.x < startPos.x ? startPos.x - currentPos.x : currentPos.x - startPos.x,
                height = currentPos.y < startPos.y ? startPos.y - currentPos.y : currentPos.y - startPos.y,
                posX = currentPos.x < startPos.x ? currentPos.x : startPos.x,
                posY = currentPos.y < startPos.y ? currentPos.y : startPos.y;

            selection.attr({width: width, height: height, x: posX, y: posY});
        };
    }

    function onMouseUp(moveFunction) {
        return function (e) {
            this.removeEventListener('mousemove', moveFunction, false);
        };
    }

    function onMouseDown(e) {
        var startPos = getPosition(e),
            selection = paper.rect(startPos.x, startPos.y, 1, 1, 3),
            moveFunction = onMouseMove(startPos, selection);

        this.addEventListener('mousemove', moveFunction, false);
        this.addEventListener('mouseup', onMouseUp(moveFunction), false);
    }

    workspace.addEventListener('mousedown', onMouseDown, false);
}());
