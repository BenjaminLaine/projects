/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   get_next_line.c                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/29 14:34:11 by blaine            #+#    #+#             */
/*   Updated: 2019/11/06 18:52:18 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "get_next_line.h"

static int	ft_put_line_str(char *end[], int fd, char **line)
{
	int		i;
	char	*tmp;

	i = 0;
	if ((i = ft_strclen(end[fd], '\n')) > -1)
	{
		tmp = ft_strdup(end[fd]);
		*line = ft_strndup(tmp, i);
		ft_strdel(&end[fd]);
		end[fd] = ft_strdup(tmp + i + 1);
		if (*(tmp + i + 1) == '\0')
			ft_strdel(&end[fd]);
		ft_strdel(&tmp);
	}
	else
	{
		*line = ft_strdup(end[fd]);
		ft_strdel(&end[fd]);
	}
	return (1);
}

int			get_next_line(const int fd, char **line)
{
	static char		*end[4000];
	char			*tmp;
	char			buf[BUFF_SIZE + 1];
	int				ret;

	if (fd < 0 || !line)
		return (-1);
	while ((ret = read(fd, buf, BUFF_SIZE)))
	{
		if (ret < 0)
			return (-1);
		buf[ret] = '\0';
		if (end[fd] == NULL)
			end[fd] = ft_strnew(0);
		tmp = ft_strjoin(end[fd], buf);
		ft_strdel(&end[fd]);
		end[fd] = ft_strdup(tmp);
		ft_strdel(&tmp);
		if ((ft_strclen(end[fd], '\n')) != -1)
			return (ft_put_line_str(end, fd, line));
	}
	if (ret == 0 && end[fd])
		return (ft_put_line_str(end, fd, line));
	return (0);
}
