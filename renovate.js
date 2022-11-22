const pkg = require('./package.json')

module.exports = {
  extends: ['config:base'],
  branchPrefix: 'renovate/',
  username: 'renovate-release',
  gitAuthor: 'Renovate Bot <bot@renovateapp.com>',
  onboarding: false,
  platform: 'github',
  repositories: ['neolitec/test-renovate'],
  labels: ['dependencies'],
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
