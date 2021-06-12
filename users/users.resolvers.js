export default {
  User: {
    totalFollowers: (root) => {
      console.log(root.username);
      return 0;
    },
    totalFollowing: () => 999,
  },
};
