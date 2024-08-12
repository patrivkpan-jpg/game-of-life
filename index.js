$(document).ready(() => {
    var matrix = {};
    var tempMatrix = {};
    const screenHeight = screen.height
    const screenWidth = screen.width
    const noOfRows = screenHeight/25;
    const noOfCols = screenWidth/25;
    const init = () => {
        for (let rowIndex = 1; rowIndex <= noOfRows; rowIndex++) {
            let tableRow = $('<tr></tr>')
            matrix[rowIndex] = []
            for (let colIndex = 0; colIndex <  noOfCols; colIndex++) {
                const cell = $(`
                    <td>
                        <button data-id="${rowIndex}:${colIndex}"></button>
                    </td>
                `)
                $(tableRow).append(cell)
                matrix[rowIndex].push(0)
            }
            $('#table_body').append(tableRow)
        }
    }
    $('table').on('click', 'button', function () {
        const selector = $(this)
        selector.toggleClass('active')
        const id = selector.data('id')
        const row = id.split(':')[0]
        const col = (id.split(':')[1])
        const active = (selector.hasClass('active')) ? 1 : 0;
        matrix[row][col] = active;
    })
    $(this).keydown(async function(e) {
        if (e.keyCode == 32) {
            e.preventDefault()
            let counter = 0;
            while (counter < 50) {
                tempMatrix = structuredClone(matrix);
                await new Promise(r => setTimeout(r, 300));
                updateMatrix();
                // counter++;
            }
        }
    });
    const updateMatrix = () => {
        $('#table_body').empty()
        for (let rowIndex = 1; rowIndex <= noOfRows; rowIndex++) {
            let tableRow = $('<tr></tr>')
            for (let colIndex = 0; colIndex <  noOfCols; colIndex++) {
                let activeClass = (checkIfActive(rowIndex, colIndex) === true) ? 'active' : ''
                const cell = $(`
                    <td>
                        <button class=${activeClass} data-id="${rowIndex}:${colIndex}"> </button>
                    </td>
                `)
                $(tableRow).append(cell)
            }
            $('#table_body').append(tableRow)
        }
    }
    // Handle edge cells
    const checkIfActive = (rowIndex, colIndex) => {
        let noOfActiveNeighbors = 0;
        if (checkIfCellExists(rowIndex - 1, colIndex - 1) && tempMatrix[rowIndex - 1][colIndex - 1] === 1) {
            noOfActiveNeighbors++;
        }
        if (checkIfCellExists(rowIndex - 1, colIndex) && tempMatrix[rowIndex - 1][colIndex] === 1) {
            noOfActiveNeighbors++;
        }
        if (checkIfCellExists(rowIndex - 1, colIndex + 1) && tempMatrix[rowIndex - 1][colIndex + 1] === 1) {
            noOfActiveNeighbors++;
        }
        if (checkIfCellExists(rowIndex, colIndex - 1) && tempMatrix[rowIndex][colIndex - 1] === 1) {
            noOfActiveNeighbors++;
        }
        if (checkIfCellExists(rowIndex, colIndex + 1) && tempMatrix[rowIndex][colIndex + 1] === 1) {
            noOfActiveNeighbors++;
        }
        if (checkIfCellExists(rowIndex + 1, colIndex - 1) && tempMatrix[rowIndex + 1][colIndex - 1] === 1) {
            noOfActiveNeighbors++;
        }
        if (checkIfCellExists(rowIndex + 1, colIndex) && tempMatrix[rowIndex + 1][colIndex] === 1) {
            noOfActiveNeighbors++;
        }
        if (checkIfCellExists(rowIndex + 1, colIndex + 1) && tempMatrix[rowIndex + 1][colIndex + 1] === 1) {
            noOfActiveNeighbors++;
        }
        let isActive = true;
        if (
            noOfActiveNeighbors === 0 || 
            noOfActiveNeighbors === 1 || 
            noOfActiveNeighbors >= 4 || 
            (noOfActiveNeighbors === 2 && tempMatrix[rowIndex][colIndex] === 0)
        ) {
            isActive = false;
        }
        matrix[rowIndex][colIndex] = + isActive;
        return isActive;
    }
    const checkIfCellExists = (rowIndex, colIndex) => {
        if (matrix[rowIndex] === undefined) {
            return false;
        }
        if (matrix[rowIndex][colIndex] === undefined) {
            return false;
        }
        return true;
    }
    init();
})