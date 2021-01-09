/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_display_file.c                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/15 15:15:41 by blaine            #+#    #+#             */
/*   Updated: 2019/10/15 15:37:35 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <unistd.h>
#include <fcntl.h>

int	main(int argc, char **argv)
{
	int		fd;
	char	c[1];

	if (argc < 2)
	{
		write(2, "File name missing.\n", 19);
		return (0);
	}
	else if (argc > 2)
	{
		write(2, "Too many arguments.\n", 20);
		return (0);
	}
	else
		fd = open(argv[1], O_RDONLY);
	if (fd == -1)
	{
		write(2, "File not found.\n", 16);
		return (0);
	}
	while (read(fd, &c, 1) > 0)
	{
		write(1, &c, 1);
	}
	return (0);
}
