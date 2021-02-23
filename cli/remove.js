let filePattern = await arg(
  "Enter a pattern. You will be prompted to confirm:"
)

let scripts = ls(simplePath("scripts"))
  .toString()
  .split(",")
  .filter(name => name.match(filePattern))
  .map(name => name.replace(".js", ""))

for await (let script of scripts) {
  const confirm =
    arg?.force ||
    (await prompt({
      type: "confirm",
      name: "value",
      message: chalk`Are you sure you want to delete {red.bold ${script}}?`,
    }))

  if (confirm) {
    await trash([
      path.join(env.SIMPLE_BIN_PATH, script),
      simplePath("scripts", script + ".js"),
    ])
  } else {
    echo(`Skipping ` + script)
  }
}
