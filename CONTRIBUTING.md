# Contributing

Please note we have a [code of conduct](CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

## Important Notes

1. Issues that have the label `first-timers-only` is made for beginners who have contributed to less than 5 repositories. This is a way to help people who are new to open source and contributing.
2. Before contributing to an issue, make sure that no one is assigned or has taken that issue. If no one is and you would like to work on the issue, please comment on the issue to let others know that someone is working on the issue.
3. Before creating a pull request, it is **important** that you make sure your branch and repository are up to date with this one. Some conflicts can be resolved, but many are hard to resolve. **Add the upstream** branch and always keep your branch up to date.

# Contents

- [Contributing](#contributing)
  - [Important Notes](#important-notes)
- [Contents](#contents)
- [Instructions](#instructions)
  - [Create Pull Request](#create-pull-request)
    - [Note on abandoned pull requests](#note-on-abandoned-pull-requests)

# Instructions

1. Fork the repository.

## Create Pull Request

1. Create a new branch:

```

git branch new-branch

```

2. Checkout new branch:

```

git checkout new-branch

```

3. Add, commit and push your changes to the new branch

```

git add .
git commit -m "changes"
git push origin new-branch

```

4. To make sure your forked repository is up to date with this repository. Add this repository as the upstream repository by doing the following:

```

git remote add upstream https://github.com/iamtalwinder/instagram-clone.git

```

Then, to fetch from this repository:

```

git fetch upstream
git merge upstream/master master

```

5. Go to your forked repository and press the “New pull request” button.
6. Once the pull request is reviewed and approved, it will be merged.

### Note on abandoned pull requests

If a pull request is left unchanged for a week after changes are requested and the issue was assigned to the person that sent the new pull request, they will be unassigned and someone else will be given the chance to work on it.
