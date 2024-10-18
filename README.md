local DrRayLibrary = loadstring(game:HttpGet("https://raw.githubusercontent.com/AZYsGithub/DrRay-UI-Library/main/DrRay.lua"))()
local window = DrRayLibrary:Load("Creeper Survival [Beta] - Free - 🌟", "Default")

local tab = DrRayLibrary.newTab("Main", "ImageIdHere")

tab.newLabel("Credits")

tab.newLabel("Kevin_MitnickHKR")

tab.newLabel("Crypted_WorkspaceHKR")

tab.newLabel("2AreYouMental110")

tab.newButton("Official Discord Community", "Kevin's Community Discord", function()
-- Official Discord Server
setclipboard(tostring("https://discord.com/invite/bc8RX8rUjs"))

game:GetService("StarterGui"):SetCore("SendNotification", {
                Title = "Copied!",
                Text = "Link Has Been Copied From Your Clipboard.",
                Duration = 3
            })
end)

tab.newLabel("Admin Commands")

tab.newButton("MitnicK Admin Panel","Admin Commands", function()
game:GetService("StarterGui"):SetCore("SendNotification", {
                Title = "You thought",
                Text = "Only premium bro check script updates",
                Duration = 69
            })
end)

tab.newButton("Nameless Admin", "Admin Commands", function()
loadstring(game:HttpGet("https://raw.githubusercontent.com/FilteringEnabled/NamelessAdmin/main/Source"))()
end)

tab.newButton("Infinite Yield", "Admin Commands2", function()
loadstring(game:HttpGet('https://raw.githubusercontent.com/EdgeIY/infiniteyield/master/source'))()
end)

tab.newButton("Ghost Hub", "Fun Hub And Stuffs", function()
loadstring(game:HttpGet('https://raw.githubusercontent.com/GhostPlayer352/Test4/main/GhostHub'))()
end)

tab.newLabel("Main Features")

local Players = game:GetService("Players")
local StarterGui = game:GetService("StarterGui")

local cooldowns = {
    killPlayer = false,
    immortalPlayer = false,
    healPlayer = false
}

local cooldownTimes = {
    killPlayer = 1,
    immortalPlayer = 1,
    healPlayer = 1
}

local function findPlayer(partialName)
    for _, p in pairs(Players:GetPlayers()) do
        if p.Name:lower():find(partialName:lower()) or p.DisplayName:lower():find(partialName:lower()) then
            return p
        end
    end
    return nil
end

local inputTarget = ""

tab.newInput("Player Name", "Enter Target Player Name", function(input)
    inputTarget = input
end)

tab.newButton("Kill Player", "Kill Entered Player", function()
    if cooldowns.killPlayer then
        StarterGui:SetCore("SendNotification", {
            Title = "On Cooldown!",
            Text = "This feature is on cooldown for 500 seconds. Please wait before using it again.",
            Duration = 15
        })
        return
    end

    local targetPlayer = findPlayer(inputTarget)
    if targetPlayer and targetPlayer.Character then
        local takedamage = targetPlayer.Character:FindFirstChild("takedamage")
        if takedamage and takedamage:IsA("RemoteEvent") then
            takedamage:FireServer(9999999)
            cooldowns.killPlayer = true
            wait(cooldownTimes.killPlayer)
            cooldowns.killPlayer = false
        else
            StarterGui:SetCore("SendNotification", {
                Title = "Error",
                Text = "The 'takedamage' RemoteEvent was not found for the target player.",
                Duration = 15
            })
        end
    else
        StarterGui:SetCore("SendNotification", {
            Title = "Error",
            Text = "Target player or character not found.",
            Duration = 15
        })
    end
end)

tab.newButton("Immortal Player", "Make Entered Player Immortal", function()
    if cooldowns.immortalPlayer then
        StarterGui:SetCore("SendNotification", {
            Title = "On Cooldown!",
            Text = "This feature is on cooldown for 500 seconds. Please wait before using it again.",
            Duration = 15
        })
        return
    end

    local targetPlayer = findPlayer(inputTarget)
    if targetPlayer and targetPlayer.Character then
        local takedamage = targetPlayer.Character:FindFirstChild("takedamage")
        if takedamage and takedamage:IsA("RemoteEvent") then
            takedamage:FireServer(-9999998)
            cooldowns.immortalPlayer = true
            wait(cooldownTimes.immortalPlayer)
            cooldowns.immortalPlayer = false
        else
            StarterGui:SetCore("SendNotification", {
                Title = "Error",
                Text = "The 'takedamage' RemoteEvent was not found for the target player.",
                Duration = 15
            })
        end
    else
        StarterGui:SetCore("SendNotification", {
            Title = "Error",
            Text = "Target player or character not found.",
            Duration = 15
        })
    end
end)

tab.newButton("Heal Player", "Heal Your Character", function()
    if cooldowns.healPlayer then
        StarterGui:SetCore("SendNotification", {
            Title = "On Cooldown!",
            Text = "This feature is on cooldown for 6 seconds. Please wait before using it again.",
            Duration = 15
        })
        return
    end

    local player = Players.LocalPlayer
    local character = player.Character
    local humanoid = character:FindFirstChildOfClass("Humanoid")

    if humanoid then
        local currentHealth = humanoid.Health
        local maxHealth = humanoid.MaxHealth
        local healthToAdd = maxHealth - currentHealth

        game:GetService("Players").LocalPlayer.Character.takedamage:FireServer(-healthToAdd)
        cooldowns.healPlayer = true
        wait(cooldownTimes.healPlayer)
        cooldowns.healPlayer = false
    else
        StarterGui:SetCore("SendNotification", {
            Title = "Error",
            Text = "Humanoid not found in your character.",
            Duration = 15
        })
    end
end)

tab.newLabel("Maps")

local function tableKeys(tbl)
    local keys = {}
    for key in pairs(tbl) do
        table.insert(keys, key)
    end
    return keys
end

local mapLocations = {
    ["Main Map"] = CFrame.new(20.296194076538086, 8.99999713897705, 23.330974578857422),
    ["Lobby"] = CFrame.new(-358.9757385253906, -4.739550590515137, -102.60234832763672),
    ["End City"] = CFrame.new(-2802.538818359375, 0.9999995231628418, -1686.102783203125),
    ["Dark Green Grass"] = CFrame.new(-5359.81298828125, 12.246665000915527, -61.54115295410156),
    ["Desert Secrets"] = CFrame.new(-4115.2705078125, 3.8963828086853027, -39.080223083496094),
    ["Magma"] = CFrame.new(-2748.187255859375, -4.736344337463379, -10.76146411895752)
}

local selectedMap = nil

tab.newDropdown("Select Map", "Choose A Map Location", tableKeys(mapLocations), function(mapName)
    selectedMap = mapName
end)

tab.newButton("Teleport", "Confirm Teleport", function()
    if selectedMap then
        local cframe = mapLocations[selectedMap]
        if cframe then
            game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = cframe
        end
    end
end)

tab.newLabel("Additional Features")

local function getHumanoid()
    local player = game.Players.LocalPlayer
    local character = player.Character or player.CharacterAdded:Wait()
    return character:WaitForChild("Humanoid")
end

tab.newInput("WalkSpeed", "Enter a value to set WalkSpeed", function(speed)
    local humanoid = getHumanoid()
    humanoid.WalkSpeed = tonumber(speed) or humanoid.WalkSpeed
end)

tab.newInput("JumpPower", "Enter a value to set JumpPower", function(jump)
    local humanoid = getHumanoid()
    humanoid.JumpPower = tonumber(jump) or humanoid.JumpPower
end)

tab.newInput("Max Jump", "Enter a value to set max jumps", function(jumps)
    local UserInputService = game:GetService("UserInputService")
    local humanoid = getHumanoid()

    local maxJumps = tonumber(jumps) or 1
    local timeBetweenJumps = 0.2
    local numJumps = 0
    local canJumpAgain = false

    local function onJumpRequest()
        if canJumpAgain and numJumps < maxJumps then
            humanoid:ChangeState(Enum.HumanoidStateType.Jumping)
            humanoid:Move(Vector3.new(0, humanoid.JumpPower, 0))
        end
    end

    local function onStateChanged(_, newState)
        if newState == Enum.HumanoidStateType.Landed then
            numJumps = 0
            canJumpAgain = false
        elseif newState == Enum.HumanoidStateType.Freefall then
            wait(timeBetweenJumps)
            canJumpAgain = true
        elseif newState == Enum.HumanoidStateType.Jumping then
            canJumpAgain = false
            numJumps = numJumps + 1
        end
    end

    humanoid.StateChanged:DisconnectAll()
    UserInputService.JumpRequest:DisconnectAll()

    humanoid.StateChanged:Connect(onStateChanged)
    UserInputService.JumpRequest:Connect(onJumpRequest)
end)

tab.newButton("Allways Day","Set Time To Allways Day", function()
while true do
    game.Lighting.ClockTime = 12
    wait(0.8)
end
end)

tab.newButton("Obtain Points And Levels","Non-FE Borrows Points", function()
while true do
    local player = game.Players.LocalPlayer
    if player and player.leaderstats then
        player.leaderstats.Points.Value = 69420
        player.leaderstats.Level.Value = 69420
    end
    wait(0.3)
end
end)

local enabled = false
local connections = {}
local Storage = Instance.new("Folder")
local CoreGui = game:GetService("CoreGui")
local Players = game:GetService("Players")

Storage.Parent = CoreGui
Storage.Name = "Highlight_Storage"

local function addNameTag(instance, name, color)
    local existingTag = instance:FindFirstChild("NameTag")
    if existingTag then
        existingTag.TextLabel.Text = name
        existingTag.TextLabel.TextColor3 = color
        return
    end

    local nameTag = Instance.new("BillboardGui")
    nameTag.Name = "NameTag"
    nameTag.Adornee = instance
    nameTag.Size = UDim2.new(0, 100, 0, 50)
    nameTag.StudsOffset = Vector3.new(0, 3, 0)
    nameTag.AlwaysOnTop = true

    local textLabel = Instance.new("TextLabel")
    textLabel.Size = UDim2.new(1, 0, 1, 0)
    textLabel.BackgroundTransparency = 1
    textLabel.TextColor3 = color
    textLabel.TextStrokeTransparency = 0
    textLabel.Text = name
    textLabel.TextScaled = true
    textLabel.TextStrokeColor3 = Color3.new(0, 0, 0)
    textLabel.TextSize = 12
    textLabel.Parent = nameTag

    nameTag.Parent = instance
end

local function removeTags(character)
    local head = character:FindFirstChild("Head")
    if head then
        local tag = head:FindFirstChild("NameTag")
        if tag then
            tag:Destroy()
        end
    end
end

local function monitorHealth(character)
    local humanoid = character:FindFirstChildOfClass("Humanoid")
    if humanoid then
        humanoid:GetPropertyChangedSignal("Health"):Connect(function()
            if humanoid.Health <= 0 then
                while humanoid.Health <= 0 do
                    wait(1)
                end
                while humanoid.Health <= 3 do
                    wait(1)
                end
                removeTags(character)
                local head = character:FindFirstChild("Head")
                if head then
                    addNameTag(head, character.Parent.DisplayName, character.Parent.Name == "Creeper" and Color3.fromRGB(0, 255, 0) or Color3.fromRGB(251, 206, 0))
                end
            end
        end)
    end
end

local function processPlayers()
    while enabled do
        for _, plr in ipairs(Players:GetPlayers()) do
            local plrchar = plr.Character
            if plrchar then
                local head = plrchar:FindFirstChild("Head")
                if head then
                    if not head:FindFirstChild("NameTag") then
                        addNameTag(head, plr.DisplayName, plr.Name == "Creeper" and Color3.fromRGB(0, 255, 0) or Color3.fromRGB(251, 206, 0))
                    end
                end
                spawn(function()
                    monitorHealth(plrchar)
                end)
            end
        end
        wait(1)
    end
end

local function toggleHighlight()
    if enabled then
        enabled = false
        for _, child in pairs(Storage:GetChildren()) do
            child:Destroy()
        end
        for _, conn in pairs(connections) do
            conn:Disconnect()
        end
        connections = {}
        for _, plr in ipairs(Players:GetPlayers()) do
            local plrchar = plr.Character
            if plrchar then
                removeTags(plrchar)
            end
        end
    else
        enabled = true
        local FillColor = Color3.fromRGB(251, 206, 0)
        local DepthMode = Enum.HighlightDepthMode.AlwaysOnTop
        local FillTransparency = 0
        local OutlineColor = Color3.fromRGB(255, 255, 255)
        local OutlineTransparency = 0

        local function Highlight(plr)
            local Highlight = Instance.new("Highlight")
            Highlight.Name = plr.Name
            Highlight.FillColor = FillColor
            Highlight.DepthMode = DepthMode
            Highlight.FillTransparency = FillTransparency
            Highlight.OutlineColor = OutlineColor
            Highlight.OutlineTransparency = OutlineTransparency
            Highlight.Parent = Storage

            local function onCharacterAdded(character)
                Highlight.Adornee = character
                spawn(function()
                    monitorHealth(character)
                end)
            end

            local plrchar = plr.Character
            if plrchar then
                onCharacterAdded(plrchar)
            end

            connections[plr] = plr.CharacterAdded:Connect(onCharacterAdded)
        end

        Players.PlayerAdded:Connect(Highlight)
        for _, v in ipairs(Players:GetPlayers()) do
            Highlight(v)
        end

        Players.PlayerRemoving:Connect(function(plr)
            local plrName = plr.Name
            if Storage:FindFirstChild(plrName) then
                Storage[plrName]:Destroy()
            end
            if connections[plr] then
                connections[plr]:Disconnect()
            end
        end)

        spawn(processPlayers)
    end
end

tab.newButton("Highlight Players/Creepers", "Esp/Chams", toggleHighlight)

local tab = DrRayLibrary.newTab("Building", "ImageIdHere")

tab.newButton("Obtain All Blocks", "Obtain All Blocks", function()
local Players = game:GetService("Players")
local player = Players.LocalPlayer
local workspace = game:GetService("Workspace")

local materials = {"scaffolding", "wood", "cobblestone", "glass", "iron", "obsidian", "glowstone"}
local amount = 100000000000

local function obtainAllBlocks()
    local buildTool = player.Backpack:FindFirstChild("Build")
    if buildTool then
        for _, material in ipairs(materials) do
            local args = {material, amount}
            local placeEvent = workspace:FindFirstChild("place")
            if placeEvent and placeEvent:IsA("RemoteEvent") then
                placeEvent:FireServer(unpack(args))
            end
        end
    end
end

local function monitorBackpack()
    local toolPresent = false

    while true do
        local buildTool = player.Backpack:FindFirstChild("Build")
        if buildTool then
            if not toolPresent then
                toolPresent = true
                obtainAllBlocks()
            end
        else
            toolPresent = false
        end

        wait(1)
    end
end

monitorBackpack()
end)

tab.newButton("Remove Player Blocks", "Remove Player Blocks (Equip Delete Tool)", function()
local toolName = "Delete"

local function equipTool(toolName)
    local player = game.Players.LocalPlayer
    local backpack = player:WaitForChild("Backpack")
    local tool = backpack:FindFirstChild(toolName)
    
    if tool and tool:IsA("Tool") then
        player.Character.Humanoid:EquipTool(tool)
    end
end

equipTool(toolName)

for i,v in pairs(game.Workspace:GetChildren()) do
    if v:IsA("BasePart") then
        game.Players.LocalPlayer.Character.Delete.RemoteEvent:FireServer(v.Position,v)
    end
end
end)

tab.newButton("Build Save/Load", "Click To Load Library", function()
    loadstring(game:HttpGet('https://pastebin.com/raw/WqthQVdK'))()
end)

tab.newLabel("Credits -:- 2AreYouMental110")

local localPlayer = game.Players.LocalPlayer
local selectedBlock = "obsidian"
local mouse = localPlayer:GetMouse()
mouse.TargetFilter = workspace.b

function doBuild(position, build)
    build.RemoteEvent:FireServer(position, Enum.NormalId.Top, workspace.map.grass, selectedBlock)
end

function getBuild()
    local build
    if localPlayer.Character and localPlayer.Character:FindFirstChild("Build") then
        build = localPlayer.Character.Build
    elseif localPlayer.Backpack:FindFirstChild("Build") then
        build = localPlayer.Backpack.Build
        build.Parent = localPlayer.Character
    end
    return build
end

tab.newDropdown("Block Selection", "Choose Block", {"wood", "iron", "glass", "cobblestone", "obsidian", "glowstone", "scaffolding", "tnt"}, function(selected)
    selectedBlock = selected
end)

local structureSize = 5
tab.newInput("Structure Size", "Enter A Value To Set Structure Size (Default - " .. tostring(structureSize) .. ")", function(input)
    structureSize = tonumber(input)
end)

local isSnapping = false
tab.newToggle("Snap Position", "If You Want The Blocks To Snap To Grid", false, function(enabled)
    isSnapping = enabled
end)

tab.newLabel("Auto Build")

local selectedStructure = "Square"

tab.newDropdown("Structure Selection", "Choose Structure Type", 
    {"Boxed Railing", "Circle", "Cube", "Cylinder", "Floor", "Inverted Cone", "Low Circle", "Pyramid", "Flat Aligned Plane", "Rhombus", "Sphere", "Spiky", "Square", "Wall"}, 
    function(selected)
        selectedStructure = selected
    end)

tab.newButton("Build", "Build Selected Structure", function()
    local pos = localPlayer.Character:GetPivot().Position
    if isSnapping then
        pos = Vector3.new(math.round(pos.X / 4) * 4, math.round(pos.Y / 4) * 4, math.round(pos.Z / 4) * 4)
    end
    local build = getBuild()
    if build then
        if selectedStructure == "Boxed Railing" then
            for x = -structureSize, structureSize do
                doBuild(pos + Vector3.new(x * 4, 0, -structureSize * 4), build)
                doBuild(pos + Vector3.new(x * 4, 0, structureSize * 4), build)
            end
            for z = -structureSize, structureSize do
                doBuild(pos + Vector3.new(-structureSize * 4, 0, z * 4), build)
                doBuild(pos + Vector3.new(structureSize * 4, 0, z * 4), build)
            end
            for x = -structureSize, structureSize do
                for z = -structureSize, structureSize do
                    doBuild(pos + Vector3.new(x * 4, structureSize * 4 - 8, z * 4), build)
                    doBuild(pos + Vector3.new(x * 4, -structureSize * 4 + 8, z * 4), build)
                end
            end
        elseif selectedStructure == "Circle" then
            for i = 1, 360 do
                local x = math.cos(math.rad(i)) * structureSize
                local z = math.sin(math.rad(i)) * structureSize
                for y = 1, structureSize do
                    doBuild(pos + Vector3.new(x * 4, y * 4 - 8, z * 4), build)
                end
            end
        elseif selectedStructure == "Cube" then
            for i = 1, structureSize do
                for v = 1, structureSize do
                    doBuild(pos + Vector3.new((i - (structureSize / 2)) * 4, (v * 4) - 8, structureSize * 2), build)
                    doBuild(pos + Vector3.new((i - (structureSize / 2)) * 4, (v * 4) - 8, -structureSize * 2), build)
                    doBuild(pos + Vector3.new(structureSize * 2, (v * 4) - 8, i * 4 - structureSize * 2), build)
                    doBuild(pos + Vector3.new(-structureSize * 2, (v * 4) - 8, i * 4 - structureSize * 2), build)
                    doBuild(pos + Vector3.new(i * 4 - structureSize * 2 - 2, structureSize * 4 - 6, v * 4 - structureSize * 2 - 2), build)
                end
            end
        elseif selectedStructure == "Cylinder" then
            local radius = structureSize / 2
            local height = structureSize
            for v = 1, height do
                for i = 1, 360 do
                    local x = radius * math.cos(math.rad(i))
                    local z = radius * math.sin(math.rad(i))
                    local buildPos = pos + Vector3.new(x, v * 4 - 8, z)
                    doBuild(buildPos, build)
                end
            end
        elseif selectedStructure == "Floor" then
            for x = 1, structureSize do
                for i = 1, structureSize do
                    doBuild(pos + Vector3.new(x * 4, -1, i * 4), build)
                end
            end
        elseif selectedStructure == "Inverted Cone" then
            for i = 1, 360 do
                local x = math.cos(math.rad(i)) * structureSize
                local z = math.sin(math.rad(i)) * structureSize
                for y = 1, structureSize do
                    local scale = y / structureSize
                    doBuild(pos + Vector3.new(x * scale * 4, y * 4 - 8, z * scale * 4), build)
                end
            end
        elseif selectedStructure == "Low Circle" then
            for i = 1, 360 do
                local x = math.cos(math.rad(i)) * structureSize
                local z = math.sin(math.rad(i)) * structureSize
                for y = 1, structureSize / 2 do
                    doBuild(pos + Vector3.new(x * 4, y * 4 - 8, z * 4), build)
                end
            end
            for y = structureSize / 2, structureSize do
                doBuild(pos + Vector3.new(0, y * 4 - 8, 0), build)
            end
            doBuild(pos + Vector3.new(0, structureSize * 4 - 8, 2 * 4), build)
            doBuild(pos + Vector3.new(0, structureSize * 4 - 8, -2 * 4), build)
        elseif selectedStructure == "Pyramid" then
            local size2 = structureSize
            for x = 1, structureSize do
                size2 = size2 - 1
                for i = 1, size2 do
                    for v = 1, size2 do
                        doBuild(pos + Vector3.new(i * 4, x * 4 - 8, v * 4), build)
                        doBuild(pos + Vector3.new(-i * 4 + 4, x * 4 - 8, v * 4), build)
                        doBuild(pos + Vector3.new(i * 4, x * 4 - 8, -v * 4 + 4), build)
                        doBuild(pos + Vector3.new(-i * 4 + 4, x * 4 - 8, -v * 4 + 4), build)
                    end
                end
            end
        elseif selectedStructure == "Flat Aligned Plane" then
            local planeSize = 2
            for i = 1, 10 do
                for x = -planeSize, planeSize do
                    for z = -planeSize, planeSize do
                        doBuild(pos + Vector3.new(x * 4, 0, z * 4 + i * 8), build)
                    end
                end
            end
            for i = 1, 10 do
                for x = -1, 1 do
                    doBuild(pos + Vector3.new(x * 4, 1, i * 8 - 2), build)
                    doBuild(pos + Vector3.new(x * 4, 1, i * 8 + 2), build)
                end
            end
        elseif selectedStructure == "Rhombus" then
            for x = -structureSize, structureSize do
                for z = -structureSize, structureSize do
                    if math.abs(x) + math.abs(z) <= structureSize then
                        for y = 1, structureSize do
                            doBuild(pos + Vector3.new(x * 4, y * 4 - 8, z * 4), build)
                        end
                    end
                end
            end
        elseif selectedStructure == "Sphere" then
            for x = -structureSize, structureSize do
                for i = -structureSize, structureSize do
                    for v = -structureSize, structureSize do
                        local distance = math.sqrt(x^2 + i^2 + v^2)
                        if distance <= structureSize then
                            doBuild(pos + Vector3.new(x * 4, i * 4, v * 4), build)
                        end
                    end
                end
            end
        elseif selectedStructure == "Spiky" then
            for x = 1, structureSize do
                for i = 1, structureSize do
                    for y = 1, math.random(structureSize) do
                        doBuild(pos + Vector3.new(x * 4, y * 4, i * 4), build)
                    end
                end
            end
        elseif selectedStructure == "Square" then
            for x = 1, structureSize do
                for i = 1, structureSize do
                    for v = 1, structureSize do
                        doBuild(pos + Vector3.new(i * 4, x * 4 - 8, v * 4), build)
                    end
                end
            end
        elseif selectedStructure == "Wall" then
            for i = 1, structureSize do
                for v = 1, structureSize do
                    doBuild(pos + Vector3.new((i - (structureSize / 2)) * 4, (v * 4) - 8, 0), build)
                end
            end
        end
    end
end)

local creeperTab = DrRayLibrary.newTab("Creepers", "ImageIdHere")

creeperTab.newLabel("Premium")

local weaponsTab = DrRayLibrary.newTab("Weapons", "ImageIdHere")

weaponsTab.newLabel("Normal Weapons")
local normalOption = ""
weaponsTab.newDropdown("Weapons", "Choose Weapon", {"stone sword", "iron sword", "gold sword", "diamond sword", "ruby sword", "sapphire sword", "Obsidian hammer sword"}, function(option)
    normalOption = option
end)

weaponsTab.newButton("Equip Weapon", "Equip Selected Option Above", function()
    local args = {normalOption, "weapons", "w"}
    workspace:WaitForChild("we"):FireServer(unpack(args))
end)

weaponsTab.newLabel("Premium")

local extraTab = DrRayLibrary.newTab("Extra", "ImageIdHere")

extraTab.newLabel("Armors")
local armorOption = ""
extraTab.newDropdown("Armors", "Choose Armor", {"leather armor", "iron armor", "gold armor", "diamond armor", "elytra"}, function(option)
    armorOption = option
end)

extraTab.newButton("Equip Armor", "Equip Selected Option Above", function()
    local args = {armorOption, "armor", "a"}
    workspace:WaitForChild("we"):FireServer(unpack(args))
end)

extraTab.newLabel("Accessories")
local accessoryOption = ""
extraTab.newDropdown("Accessories", "Choose Accessory", {"None", "Headband", "Pan", "Rocket hat", "Helmet", "Angel ring", "Golden crown"}, function(option)
    accessoryOption = option
end)

extraTab.newButton("Equip Accessory", "Equip Selected Option Above", function()
    local args = {accessoryOption, "accessory", "ac"}
    workspace:WaitForChild("we"):FireServer(unpack(args))
end)

extraTab.newLabel("Delete Tool")

local deleteOption = ""
local autoDeleteEnabled = false

local dropdown = extraTab.newDropdown("Tools", "Choose Tool", 
    {"Teleport pearl", "Bow", "Torch", "Apple", "Golden apple", "Iron golem", "Speed potion", "Jump potion", "Strength potion"}, 
    function(option)
        deleteOption = option
    end)

local button = extraTab.newButton("Delete Tool", "Delete Tools", function()
    local player = game.Players.LocalPlayer
    local backpack = player.Backpack
    local toolName = deleteOption
    for i, item in pairs(backpack:GetChildren()) do
        if item:IsA("Tool") and item.Name == toolName then
            item:Destroy()
        end
    end
end)

local toggle = extraTab.newToggle("Auto Delete Tool", "Automatically Deletes The Selected Tool When Enabled", false, function(isEnabled)
    autoDeleteEnabled = isEnabled
end)

game:GetService("RunService").Stepped:Connect(function()
    if autoDeleteEnabled and deleteOption ~= "" then
        local player = game.Players.LocalPlayer
        local backpack = player.Backpack
        local toolName = deleteOption
        for i, item in pairs(backpack:GetChildren()) do
            if item:IsA("Tool") and item.Name == toolName then
                item:Destroy()
            end
        end
    end
end)

local function equipTool(toolName)
    local player = game.Players.LocalPlayer
    local tool = player.Backpack:FindFirstChild(toolName)

    if tool then
        local humanoid = player.Character and player.Character:FindFirstChildOfClass("Humanoid")
        if humanoid then
            humanoid:EquipTool(tool)
        end
    end
end

local function dropTool(toolName)
    local player = game.Players.LocalPlayer
    local character = player.Character
    local tool = character:FindFirstChild(toolName)
    if tool then
        tool.Parent = player.Backpack
    else
        print("Tool not found in character.")
    end
end

local function fireServer(toolName, amount)
    for i = 1, tonumber(amount) do
        local args = {
            [1] = toolName,
            [2] = 0,
            [3] = "tools",
            [4] = "Toolstats",
            [5] = toolName
        }
        workspace.wb:FireServer(unpack(args))
    end
end

local function setupTool(extraTab, toolName, fileName)
    extraTab.newLabel(toolName)
    extraTab.newInput(toolName .. "s", "Set A Value Number For " .. toolName, function(amount)
        fireServer(fileName or toolName, amount)
    end)

    local toolLoop = false
    local toolButton = extraTab.newButton("Spam " .. toolName, "Spam " .. toolName, function()
        toolLoop = true
        while toolLoop do
            equipTool(fileName or toolName)
            wait(0.1)
        end
    end)

    local stopButton = extraTab.newButton("Stop " .. toolName .. " Spam", "Stop Spamming " .. toolName, function()
        toolLoop = false
    end)

    extraTab.newButton("Drop " .. toolName, "Drop Tools", function()
        equipTool(fileName or toolName)
        wait(1)
        dropTool(fileName or toolName)
    end)
end

setupTool(extraTab, "Torch")
setupTool(extraTab, "Teleport pearl")
setupTool(extraTab, "Bow")
setupTool(extraTab, "Apple")
setupTool(extraTab, "Golden apple")
setupTool(extraTab, "Speed potion")
setupTool(extraTab, "Jump potion")
setupTool(extraTab, "Strength", "Strengh potion") 
