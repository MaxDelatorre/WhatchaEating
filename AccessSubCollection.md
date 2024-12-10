
const userRef = ref(db, 'User_account/' + user.uid + '/User_profile');
set(userRef, {
    history: "Some history data",
    favorites: ["Pizza", "Ice Cream"]
});
