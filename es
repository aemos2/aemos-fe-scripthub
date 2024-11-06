local ESP = {}
ESP.Settings = {
    Enabled = true,
    Max_Distance = 100,
    Font_Size = 12,
    Outlines = true,
    Outline_Color = Color3.fromRGB(0, 0, 0),
    Display_Name = true,
    Team_Check = false,
    Highlight = {
        Target = { Enabled = false, Color = Color3.fromRGB(255, 255, 255), Player = nil },
    },
    Settings = {
        Name = { Enabled = true, Color = Color3.fromRGB(255, 255, 255) },
        Distance = { Enabled = false, Color = Color3.fromRGB(255, 255, 255) },
        Box = { Enabled = true, Outline = true, Color = Color3.fromRGB(255, 255, 255), Type = 'corner' },
        Chams = { Enabled = false, Transparency = 80, Color = Color3.fromRGB(115, 100, 215), Breathe = true, VisibleCheck = false },
        HealthBar = { Enabled = true, ColorFull = Color3.fromRGB(115, 100, 215), ColorEmpty = Color3.fromRGB(0, 0, 0), Text = true, TextColor = Color3.fromRGB(115, 100, 215), Thickness = 5, Options = "Gradient" },
        Weapon = { Enabled = true, Images = true, Images_Color = Color3.fromRGB(115, 100, 215), Color = Color3.fromRGB(255, 255, 255) },
    },
    cache = {}, playerConnections = {}, functions = {},
    renderConnection = nil,
}

function ESP.RemoveAll()
    for _, cache in pairs(ESP.Settings.cache) do
        for _, obj in pairs(cache) do
            obj:Remove()
        end
    end
    ESP.Settings.cache = {}
    for _, connection in pairs(ESP.Settings.playerConnections) do
        connection:Disconnect()
    end
    ESP.Settings.playerConnections = {}
    if ESP.Settings.renderConnection then
        ESP.Settings.renderConnection:Disconnect()
        ESP.Settings.renderConnection = nil
    end
end

function ESP.CreateDrawing(Type, Options)
    local Object = Drawing.new(Type)
    for Property, Value in pairs(Options) do
        Object[Property] = Value
    end
    return Object
end

function ESP.GenerateDrawObjects()
    return {
        NameText = ESP.CreateDrawing("Text", { Outline = true, Center = true, Color = ESP.Settings.Settings.Name.Color }),
        DistanceText = ESP.CreateDrawing("Text", { Outline = true, Center = true, Color = ESP.Settings.Settings.Distance.Color }),
        Box_Outline = ESP.CreateDrawing("Square", { Color = ESP.Settings.Outline_Color, Thickness = 3 }),
        Box = ESP.CreateDrawing("Square", { Color = ESP.Settings.Settings.Box.Color }),
        Health = ESP.CreateDrawing("Image", { Data = crypt.base64.decode("/9j/...") }),
        Health_Outline = ESP.CreateDrawing("Square", { Color = ESP.Settings.Outline_Color }),
        Health_Fill = ESP.CreateDrawing("Square", { Color = Color3.fromRGB(0, 0, 0), Filled = true }),
        HealthText = ESP.CreateDrawing("Text", { Outline = true, Center = true, Color = ESP.Settings.Settings.HealthBar.TextColor }),
        WeaponText = ESP.CreateDrawing("Text", { Outline = true, Center = true, Color = ESP.Settings.Settings.Weapon.Color }),
    }
end

function ESP.Initialize()
    ESP.RemoveAll()

    local function RenderPlayer(player)
        local esptable = ESP.GenerateDrawObjects()
        ESP.Settings.cache[player] = esptable
    end

    local function Dispose(esptable)
        for _, v in pairs(esptable) do
            v:Remove()
        end
    end

    local function Hide(esptable)
        for _, v in pairs(esptable) do
            v.Visible = false
        end
    end

    local function UpdateESP()
        for player, cache in pairs(ESP.Settings.cache) do
            -- Add your logic here (BoxMath, Health Bar, Chams, etc.)
        end
    end

    if ESP.Settings.renderConnection then ESP.Settings.renderConnection:Disconnect() end
    ESP.Settings.renderConnection = game:GetService("RunService").RenderStepped:Connect(UpdateESP)

    game.Players.PlayerAdded:Connect(function(player)
        task.delay(1, function() RenderPlayer(player) end)
    end)

    game.Players.PlayerRemoving:Connect(function(plr)
        if ESP.Settings.cache[plr] then
            Dispose(ESP.Settings.cache[plr])
            ESP.Settings.cache[plr] = nil
        end
    end)
end

return ESP
