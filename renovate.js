const pkg = require('./package.json')

module.exports = {
  extends: ['config:base'],
  branchPrefix: 'renovate/',
  username: 'renovate-release',
  gitAuthor: 'Renovate Bot <bot@renovateapp.com>',
  onboarding: false,
  platform: 'github',
  repositories: [pkg.name],
  packageRules: [
    {
      description: 'lockFileMaintenance',
      matchUpdateTypes: [
        'digest',
        'patch',
        'minor',
        'major',
        'lockFileMaintenance',
      ],
      dependencyDashboardApproval: false,
      stabilityDays: 0,
    },
  ],
  commitMessagePrefix: 'chore(deps):',
}
