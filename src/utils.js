const match = (test = null, acc = null) => ({
    case: (val, act) => match(test, val === test ? act() : acc),
    if: (cond, act) => match(test, cond ? act() : acc),
    plage: (val1, val2, act) => match(test, (test >= val1 && test <= val2) ? act() : acc),
    default: act => acc === null ? act() : acc
})

module.exports = {
    match
}