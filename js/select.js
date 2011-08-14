var workspace = document.getElementById('workspace'),
    paper = Raphael('workspace', 800, 600);

workspace.addEventListener('mousedown', function (e) {
    var onMouseMove,
        onMouseOut,
        selection,
        startX = e.clientX - (e.clientX - e.offsetX),
        startY = e.clientY - (e.clientY - e.offsetY);

    selection = paper.rect(startX, startY, 1, 1, 0);

    onMouseMove = function (e) {
        var currentX = (e.clientX - (e.clientX - e.offsetX)),
            currentY = (e.clientY - (e.clientY - e.offsetY)),
            width = 0,
            height = 0,
            posX = 0,
            posY = 0;

        width = currentX >= startX ? currentX - startX : startX - currentX;
        height = currentY >= startY ? currentY - startY : startY - currentY;
        posX = currentX < startX ? currentX : startX;
        posY = currentY < startY ? currentY : startY;

        selection.attr({width: width, height: height, x: posX, y: posY});
    };

    onMouseOut = function (e) {
        this.removeEventListener('mousemove', onMouseMove, false);
        console.log('poobar');
    };

    this.addEventListener('mousemove', onMouseMove, false);
    this.addEventListener('mouseup', onMouseOut, false);
});
