var total = 30;

for (var i = 1; i <= total; i++) {
    console.log(showPages(i, total, 2));
}

// function showPages (page, total, show) {
//     var str = '';

//     if (page < show + 1) {
//         for (var i = 1; i <= show * 2 + 1; i++) {
//             str = str + ' ' + i;
//         }
//     } else if (page > total - show) {
//         for (var i = total - show * 2; i <= total; i++) {
//             str = str + ' ' + i;
//         }
//     } else {
//         for (var i = page - show; i <= page + show; i++) {
//             str = str + ' ' + i;
//         }
//     }
//     return str.trim();
// }


// function showPages(page, length, show) {
//     var str = '';
//     var preIndex = page - (show + 1);
//     var aftIndex = page + (show + 1);
//     if (page < show + 3) {
//         for (var i = 1; i <= show * 2 + 3; i++) {
//             if ((i !== preIndex && i !== aftIndex) || (i === 1 || i === total)) {
//                 str = str + ' ' + i;
//             } else {
//                 str = str + ' ... ' + total;
//                 break;
//             }
//         }
//     } else if (page > total - (show + 2)) {
//         for (var i = total; i >= total - (show * 2 + 2); i--) {
//             if ((i !== preIndex && i !== aftIndex) || (i === 1 || i === total)) {
//                 str = i + ' ' + str;
//             } else {
//                 str = '1 ... ' + str;
//                 break;
//             }
//         }
//     } else {
//         for (var i = preIndex + 1; i <= aftIndex - 1; i++) {
//             str = str + ' ' + i;
//         }
//         str = '1 ... ' + str + ' ... ' + total;
//     }
//     return str.trim();
// }
