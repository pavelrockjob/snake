export const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const restrict = (coord, max, length) => {
    return coord + length >= max ? max - length + 1 : coord
}