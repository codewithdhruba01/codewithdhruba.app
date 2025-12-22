export const essentialLinuxCommands = {
  title:
    'Essential Linux Commands: A Comprehensive Guide (50 Commands with Examples)',
  date: 'Dec 8, 2025',
  author: 'Dhrubaraj Pati',
  category: 'Linux',
  readTime: '10 min read',
  content: `
    <p>Linux is one of the most powerful and flexible operating systems available today. Whether you're a developer, system administrator, cybersecurity learner, or technology enthusiast, Linux commands help you work faster, automate tasks, and control your entire system from the terminal.</p>

    <p>This guide covers <strong>50 essential Linux commands</strong> with explanations and real examples — perfect for beginners and intermediate users looking to improve their Linux skills.</p>

    <h2>1. pwd — Print Working Directory</h2>
    <p><strong>Purpose:</strong> Shows your current directory path.</p>
    <p><strong>Example:</strong> <code>pwd</code></p>

    <h2>2. ls — List Files</h2>
    <p><strong>Purpose:</strong> Displays files and folders.</p>
    <p><strong>Example:</strong> <code>ls -la</code></p>

    <h2>3. cd — Change Directory</h2>
    <p><strong>Purpose:</strong> Moves between folders.</p>
    <p><strong>Example:</strong> <code>cd Documents/</code></p>

    <h2>4. touch — Create File</h2>
    <p><strong>Purpose:</strong> Creates an empty file.</p>
    <p><strong>Example:</strong> <code>touch notes.txt</code></p>

    <h2>5. mkdir — Make Directory</h2>
    <p><strong>Purpose:</strong> Creates new folders.</p>
    <p><strong>Example:</strong> <code>mkdir projects</code></p>

    <h2>6. rmdir — Remove Empty Directory</h2>
    <p><strong>Purpose:</strong> Deletes an empty directory.</p>
    <p><strong>Example:</strong> <code>rmdir oldfolder</code></p>

    <h2>7. rm — Remove Files</h2>
    <p><strong>Purpose:</strong> Deletes files or folders.</p>
    <p><strong>Example:</strong> <code>rm -rf folder</code></p>

    <h2>8. cp — Copy Files</h2>
    <p><strong>Purpose:</strong> Copies files or directories.</p>
    <p><strong>Example:</strong> <code>cp file.txt backup.txt</code></p>

    <h2>9. mv — Move or Rename</h2>
    <p><strong>Purpose:</strong> Moves or renames files.</p>
    <p><strong>Example:</strong> <code>mv old.txt new.txt</code></p>

    <h2>10. cat — View File Content</h2>
    <p><strong>Purpose:</strong> Prints file content to terminal.</p>
    <p><strong>Example:</strong> <code>cat info.txt</code></p>

    <h2>11. nano — Edit File (Beginner-Friendly)</h2>
    <p><strong>Purpose:</strong> Opens file in nano editor.</p>
    <p><strong>Example:</strong> <code>nano config.txt</code></p>

    <h2>12. vim — Advanced Text Editor</h2>
    <p><strong>Purpose:</strong> Opens file in vim editor.</p>
    <p><strong>Example:</strong> <code>vim main.py</code></p>

    <h2>13. head — Show First Lines</h2>
    <p><strong>Purpose:</strong> Prints first 10 lines.</p>
    <p><strong>Example:</strong> <code>head logs.txt</code></p>

    <h2>14. tail — Show Last Lines</h2>
    <p><strong>Purpose:</strong> Prints last 10 lines.</p>
    <p><strong>Example:</strong> <code>tail logs.txt</code></p>

    <h2>15. less — Scroll File Content</h2>
    <p><strong>Purpose:</strong> Opens file in scroll mode.</p>
    <p><strong>Example:</strong> <code>less story.txt</code></p>

    <h2>16. grep — Search in Files</h2>
    <p><strong>Purpose:</strong> Searches text inside files.</p>
    <p><strong>Example:</strong> <code>grep "error" server.log</code></p>

    <h2>17. find — Search Files</h2>
    <p><strong>Purpose:</strong> Finds files by name/type.</p>
    <p><strong>Example:</strong> <code>find / -name "config.json"</code></p>

    <h2>18. locate — Fast File Search</h2>
    <p><strong>Purpose:</strong> Quickly finds file locations.</p>
    <p><strong>Example:</strong> <code>locate notes.txt</code></p>

    <h2>19. df — Disk Usage</h2>
    <p><strong>Purpose:</strong> Shows free/used disk space.</p>
    <p><strong>Example:</strong> <code>df -h</code></p>

    <h2>20. du — Directory Size</h2>
    <p><strong>Purpose:</strong> Shows folder size.</p>
    <p><strong>Example:</strong> <code>du -sh /var/log</code></p>

    <h2>21. free — Memory Usage</h2>
    <p><strong>Purpose:</strong> Displays RAM usage.</p>
    <p><strong>Example:</strong> <code>free -h</code></p>

    <h2>22. uname — System Information</h2>
    <p><strong>Purpose:</strong> Shows OS, kernel version.</p>
    <p><strong>Example:</strong> <code>uname -a</code></p>

    <h2>23. top — Process Viewer</h2>
    <p><strong>Purpose:</strong> Shows real-time CPU and RAM usage.</p>
    <p><strong>Example:</strong> <code>top</code></p>

    <h2>24. htop — Advanced Process Viewer</h2>
    <p><strong>Purpose:</strong> Colorful interactive system monitor.</p>
    <p><strong>Example:</strong> <code>htop</code></p>

    <h2>25. ps — Process Status</h2>
    <p><strong>Purpose:</strong> Shows running processes.</p>
    <p><strong>Example:</strong> <code>ps aux</code></p>

    <h2>26. kill — Terminate Process</h2>
    <p><strong>Purpose:</strong> Stops a process by PID.</p>
    <p><strong>Example:</strong> <code>kill 1234</code></p>

    <h2>27. ping — Test Connectivity</h2>
    <p><strong>Purpose:</strong> Checks server connection.</p>
    <p><strong>Example:</strong> <code>ping google.com</code></p>

    <h2>28. curl — Download or Fetch URLs</h2>
    <p><strong>Purpose:</strong> Sends API requests or downloads data.</p>
    <p><strong>Example:</strong> <code>curl https://api.github.com</code></p>

    <h2>29. wget — Download Files</h2>
    <p><strong>Purpose:</strong> Downloads files from URLs.</p>
    <p><strong>Example:</strong> <code>wget https://example.com/file.zip</code></p>

    <h2>30. ip a — Network Info</h2>
    <p><strong>Purpose:</strong> Shows IP addresses & interfaces.</p>
    <p><strong>Example:</strong> <code>ip a</code></p>

    <h2>31. hostname — Show System Name</h2>
    <p><strong>Purpose:</strong> Displays device hostname.</p>
    <p><strong>Example:</strong> <code>hostname</code></p>

    <h2>32. whoami — Current User</h2>
    <p><strong>Purpose:</strong> Prints the logged-in username.</p>
    <p><strong>Example:</strong> <code>whoami</code></p>

    <h2>33. history — Command History</h2>
    <p><strong>Purpose:</strong> Shows previously used commands.</p>
    <p><strong>Example:</strong> <code>history</code></p>

    <h2>34. sudo — Run as Administrator</h2>
    <p><strong>Purpose:</strong> Executes commands with root privileges.</p>
    <p><strong>Example:</strong> <code>sudo apt update</code></p>

    <h2>35. chmod — Change Permissions</h2>
    <p><strong>Purpose:</strong> Sets read/write/execute permissions.</p>
    <p><strong>Example:</strong> <code>chmod +x script.sh</code></p>

    <h2>36. chown — Change File Owner</h2>
    <p><strong>Purpose:</strong> Changes file ownership.</p>
    <p><strong>Example:</strong> <code>chown user:user file.txt</code></p>

    <h2>37. tar — Archive Files</h2>
    <p><strong>Purpose:</strong> Create or extract .tar archives.</p>
    <p><strong>Example:</strong> <code>tar -cvf backup.tar folder/</code></p>

    <h2>38. zip — Create Zip File</h2>
    <p><strong>Purpose:</strong> Compress files into .zip.</p>
    <p><strong>Example:</strong> <code>zip project.zip file1 file2</code></p>

    <h2>39. unzip — Extract Zip File</h2>
    <p><strong>Purpose:</strong> Extracts .zip files.</p>
    <p><strong>Example:</strong> <code>unzip project.zip</code></p>

    <h2>40. man — Command Manual</h2>
    <p><strong>Purpose:</strong> Displays documentation for commands.</p>
    <p><strong>Example:</strong> <code>man ls</code></p>

    <h2>41. echo — Print Text</h2>
    <p><strong>Purpose:</strong> Prints text to the terminal.</p>
    <p><strong>Example:</strong> <code>echo "Hello Linux"</code></p>

    <h2>42. date — Show Date & Time</h2>
    <p><strong>Purpose:</strong> Prints system date/time.</p>
    <p><strong>Example:</strong> <code>date</code></p>

    <h2>43. cal — Calendar View</h2>
    <p><strong>Purpose:</strong> Shows a monthly calendar.</p>
    <p><strong>Example:</strong> <code>cal</code></p>

    <h2>44. shutdown — Power Off System</h2>
    <p><strong>Purpose:</strong> Shutdown or restart Linux.</p>
    <p><strong>Example:</strong> <code>shutdown now</code></p>

    <h2>45. reboot — Restart System</h2>
    <p><strong>Purpose:</strong> Reboots the computer.</p>
    <p><strong>Example:</strong> <code>reboot</code></p>

    <h2>46. apt install — Install Software</h2>
    <p><strong>Purpose:</strong> Installs packages (Debian/Ubuntu).</p>
    <p><strong>Example:</strong> <code>sudo apt install git</code></p>

    <h2>47. apt remove — Remove Software</h2>
    <p><strong>Purpose:</strong> Uninstalls packages.</p>
    <p><strong>Example:</strong> <code>sudo apt remove nodejs</code></p>

    <h2>48. systemctl — Manage Services</h2>
    <p><strong>Purpose:</strong> Controls system services.</p>
    <p><strong>Example:</strong> <code>systemctl restart apache2</code></p>

    <h2>49. service — Start/Stop Services</h2>
    <p><strong>Purpose:</strong> Manually control services.</p>
    <p><strong>Example:</strong> <code>service ssh start</code></p>

    <h2>50. passwd — Change Password</h2>
    <p><strong>Purpose:</strong> Updates user password.</p>
    <p><strong>Example:</strong> <code>passwd</code></p>

    <h2>Conclusion</h2>
    <p>These 50 essential Linux commands will help you navigate, control, and manage your system more efficiently. Whether you're a beginner or aspiring power user, mastering these commands will greatly improve your productivity and confidence in the Linux environment.</p>
  `,
  image: '/blog/linux_commands.png',
  tags: [
    'Linux',
    'Commands',
    'CLI',
    'System Administration',
    'Terminal Guide',
  ],
};
